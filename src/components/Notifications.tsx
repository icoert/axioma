import { useEffect, useState } from 'react';
import { Bell, CheckCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLearning } from '../hooks/useLearning';
import { markNotificationRead, subscribeNotifications } from '../lib/community';
import type { AppNotification } from '../lib/community';

export function NotificationCenter(){
 const {user}=useLearning();const navigate=useNavigate();const [items,setItems]=useState<AppNotification[]>([]);const [open,setOpen]=useState(false);const [error,setError]=useState(false);
 useEffect(()=>{if(!user){setItems([]);return;}return subscribeNotifications(user.uid,setItems,()=>setError(true));},[user]);
 if(!user)return null;const unread=items.filter(item=>!item.readAt).length;
 const openItem=async(item:AppNotification)=>{if(!item.readAt)await markNotificationRead(item.id);setOpen(false);navigate('/prieteni');};
 return <div className="notification-center"><button className="notification-trigger" aria-label={`Notificări${unread?` (${unread} necitite)`:''}`} aria-expanded={open} onClick={()=>setOpen(value=>!value)}><Bell size={19}/>{unread>0&&<span>{unread>9?'9+':unread}</span>}</button>{open&&<section className="notification-panel" aria-label="Notificări"><div className="notification-panel-head"><strong>Notificări</strong>{unread===0&&<span><CheckCheck size={15}/>La zi</span>}</div>{error?<p className="notification-empty">Notificările nu pot fi încărcate.</p>:items.length===0?<p className="notification-empty">Nicio notificare deocamdată.</p>:items.map(item=><button key={item.id} className={`notification-item ${item.readAt?'':'unread'}`} onClick={()=>openItem(item)}><span className="notification-dot"/><span><strong>{item.title}</strong><small>{item.body}</small></span></button>)}</section>}</div>;
}