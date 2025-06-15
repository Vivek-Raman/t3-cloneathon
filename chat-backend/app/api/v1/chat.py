from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Optional, Dict, Any
from pydantic import BaseModel
from datetime import datetime
from uuid import UUID
from app.database import supabase
from app.api.deps import get_current_user

router = APIRouter()

class ChatCreate(BaseModel):
    title: str

class ChatResponse(BaseModel):
    id: UUID
    owner_id: UUID
    title: str
    created_at: datetime

class APIResponse(BaseModel):
    status_code: int
    message: str
    data: Optional[Any] = None

@router.post("/", response_model=APIResponse)
async def create_chat(
    chat: ChatCreate,
    current_user: dict = Depends(get_current_user)
):
    """Create a new chat"""
    try:
        data = {
            "owner_id": current_user.id,
            "title": chat.title
        }
        result = supabase.table("chats").insert(data).execute()
        return {
            "status_code": status.HTTP_201_CREATED,
            "message": "Chat created successfully",
            "data": result.data[0]
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

@router.get("/", response_model=APIResponse)
async def get_chats(
    current_user: dict = Depends(get_current_user)
):
    """Get all chats for the current user"""
    try:
        result = supabase.table("chats").select("*").eq("owner_id", current_user.id).execute()
        return {
            "status_code": status.HTTP_200_OK,
            "message": "Chats retrieved successfully",
            "data": result.data
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

@router.get("/{chat_id}", response_model=APIResponse)
async def get_chat(
    chat_id: UUID,
    current_user: dict = Depends(get_current_user)
):
    """Get a specific chat"""
    try:
        result = supabase.table("chats").select("*").eq("id", str(chat_id)).eq("owner_id", current_user.id).execute()
        if not result.data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Chat not found"
            )
        return {
            "status_code": status.HTTP_200_OK,
            "message": "Chat retrieved successfully",
            "data": result.data[0]
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

@router.put("/{chat_id}", response_model=APIResponse)
async def update_chat(
    chat_id: UUID,
    chat: ChatCreate,
    current_user: dict = Depends(get_current_user)
):
    """Update a chat"""
    try:
        result = supabase.table("chats").update({"title": chat.title}).eq("id", str(chat_id)).eq("owner_id", current_user.id).execute()
        if not result.data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Chat not found"
            )
        return {
            "status_code": status.HTTP_200_OK,
            "message": "Chat updated successfully",
            "data": result.data[0]
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

@router.delete("/{chat_id}", response_model=APIResponse)
async def delete_chat(
    chat_id: UUID,
    current_user: dict = Depends(get_current_user)
):
    """Delete a chat"""
    try:
        result = supabase.table("chats").delete().eq("id", str(chat_id)).eq("owner_id", current_user.id).execute()
        if not result.data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Chat not found"
            )
        return {
            "status_code": status.HTTP_200_OK,
            "message": "Chat deleted successfully",
            "data": None
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        ) 