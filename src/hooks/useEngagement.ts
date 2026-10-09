import { useEffect, useState } from 'react';
import { useLearning } from './useLearning';
import { readPreferences, type EngagementPreferences } from '../lib/engagement';
export function useEngagement(){const {user}=useLearning();const key=`axioma:engagement:${user?.uid??'guest'}`;const [preferences,setPreferences]=useState(()=>readPreferences(key));const [error,setError]=useState(false);
 useEffect(()=>{setPreferences(readPreferences(key));setError(false);const refresh=()=>setPreferences(readPreferences(key));window.addEventListener('axioma:engagement',refresh);window.addEventListener('storage',refresh);return()=>{window.removeEventListener('axioma:engagement',refresh);window.removeEventListener('storage',refresh);};},[key]);
 const change=(patch:Partial<EngagementPreferences>)=>{const next={...readPreferences(key),...patch};setPreferences(next);try{localStorage.setItem(key,JSON.stringify(next));setError(false);window.dispatchEvent(new Event('axioma:engagement'));return true;}catch{setError(true);return false;}};
 return {preferences,change,error};
}
