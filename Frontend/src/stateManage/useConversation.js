import { create } from 'zustand'

const useConversation = create((set) => ({
    selectedConversation: null,
    setSelectedConversation: (conversation) => set({ selectedConversation: conversation }),
    messages: [],
    setMessages: (messages) => set({ messages }),
    searchTerm: "",
    setSearchTerm: (searchTerm) => set({ searchTerm }),
}))
export default useConversation;