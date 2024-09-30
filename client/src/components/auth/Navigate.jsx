import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Navigate() {
    const navigate = useNavigate()
  return (
    navigate("/")
   
  )
}
