// פונקציה שמפרקת את קלט המשתמש לפקודה (מילה ראשונה) וארגומנט (שאר השורה)
export const parseCommand = (input) => {
    if (!input || typeof input !== 'string') {
        return { command: '', arg: '' };
    }
    
    // מחיקת רווחים מיותרים מהקצוות ופיצול לפי רווחים
    const parts = input.trim().split(/\s+/); 
    const command = parts[0].toLowerCase();
    
    // חיבור מחדש של שאר החלקים במקרה שהארגומנט מכיל רווחים
    const arg = parts.slice(1).join(' '); 
    
    return { command, arg };
};

