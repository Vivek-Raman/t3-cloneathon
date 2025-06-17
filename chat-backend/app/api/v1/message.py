from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Optional, Dict, Any
from pydantic import BaseModel
from datetime import datetime
from uuid import UUID
from app.database import supabase
from app.api.deps import get_current_user

router = APIRouter()

class MessageCreate(BaseModel):
    chat_id: UUID
    content: str
    role: str = "user"  # Default to user role

class MessageResponse(BaseModel):
    id: UUID
    chat_id: UUID
    sender_id: UUID
    role: str
    content: str
    created_at: datetime

class APIResponse(BaseModel):
    status_code: int
    message: str
    data: Optional[Any] = None

@router.post("/", response_model=APIResponse)
async def create_message(
    message: MessageCreate,
    current_user: dict = Depends(get_current_user)
):
    """Create a new message"""
    try:
        # Verify chat ownership
        chat = supabase.table("chats").select("*").eq("id", str(message.chat_id)).eq("owner_id", current_user.id).execute()
        if not chat.data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Chat not found"
            )

        data = {
            "chat_id": str(message.chat_id),
            "sender_id": current_user.id,
            "content": message.content,
            "role": message.role
        }
        result = supabase.table("messages").insert(data).execute()
        return {
            "status_code": status.HTTP_201_CREATED,
            "message": "Message created successfully",
            "data": result.data[0]
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

@router.get("/chat/{chat_id}", response_model=APIResponse)
async def get_chat_messages(
    chat_id: UUID,
    current_user: dict = Depends(get_current_user)
):
    """Get all messages for a specific chat"""
    try:
        # Verify chat ownership
        chat = supabase.table("chats").select("*").eq("id", str(chat_id)).eq("owner_id", current_user.id).execute()
        if not chat.data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Chat not found"
            )

        result = supabase.table("messages").select("*").eq("chat_id", str(chat_id)).order("created_at").execute()
        return {
            "status_code": status.HTTP_200_OK,
            "message": "Messages retrieved successfully",
            "data": result.data
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

@router.get("/{message_id}", response_model=APIResponse)
async def get_message(
    message_id: UUID,
    current_user: dict = Depends(get_current_user)
):
    """Get a specific message"""
    try:
        result = supabase.table("messages").select("*").eq("id", str(message_id)).execute()
        if not result.data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Message not found"
            )
        
        # Verify chat ownership
        chat = supabase.table("chats").select("*").eq("id", result.data[0]["chat_id"]).eq("owner_id", current_user.id).execute()
        if not chat.data:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized to access this message"
            )
        
        return {
            "status_code": status.HTTP_200_OK,
            "message": "Message retrieved successfully",
            "data": result.data[0]
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

@router.put("/{message_id}", response_model=APIResponse)
async def update_message(
    message_id: UUID,
    message: MessageCreate,
    current_user: dict = Depends(get_current_user)
):
    """Update a message"""
    try:
        # Get the message first to check ownership
        existing_message = supabase.table("messages").select("*").eq("id", str(message_id)).execute()
        if not existing_message.data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Message not found"
            )
        
        if existing_message.data[0]["sender_id"] != current_user.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized to update this message"
            )

        data = {
            "content": message.content,
            "role": message.role
        }
        result = supabase.table("messages").update(data).eq("id", str(message_id)).execute()
        return {
            "status_code": status.HTTP_200_OK,
            "message": "Message updated successfully",
            "data": result.data[0]
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

@router.delete("/{message_id}", response_model=APIResponse)
async def delete_message(
    message_id: UUID,
    current_user: dict = Depends(get_current_user)
):
    """Delete a message"""
    try:
        # Get the message first to check ownership
        existing_message = supabase.table("messages").select("*").eq("id", str(message_id)).execute()
        if not existing_message.data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Message not found"
            )
        
        if existing_message.data[0]["sender_id"] != current_user.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized to delete this message"
            )

        result = supabase.table("messages").delete().eq("id", str(message_id)).execute()
        return {
            "status_code": status.HTTP_200_OK,
            "message": "Message deleted successfully",
            "data": None
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        ) 