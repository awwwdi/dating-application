export const formatMessageTime = (date) => {
  const messageDate = new Date(date);
  const now = new Date();
  
  if (messageDate.toDateString() === now.toDateString()) {
    return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  
  if (now.getTime() - messageDate.getTime() < 7 * 24 * 60 * 60 * 1000) {
    return messageDate.toLocaleDateString([], { weekday: 'short' });
  }
  
  return messageDate.toLocaleDateString([], { month: 'short', day: 'numeric' });
}; 