
import Conversation from "../models/conversation-model.js";
import Message from "../models/message-model.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        if (!message || message.trim().length === 0) {
            return res.status(400).json({ error: "Message cannot be empty" });
        }

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            });
        }

        // Create message for both new and existing conversations
        const newMessage = new Message({
            sender: senderId,
            receiver: receiverId,
            message
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
            await Promise.all([conversation.save(), newMessage.save()]);
            return res.status(201).json({
                message: "Message sent successfully",
                newMessage,
                conversation: conversation._id
            });
        }

        return res.status(500).json({ error: "Failed to create message" });
    }
    catch (error) {
        console.error("Send message error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getMessages = async (req, res) => {
    try {
        const { id: chatUser } = req.params;
        const senderId = req.user._id;
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, chatUser] }
        });
        if (!conversation) {
            return res.status(200).json({ messages: "No Conversation Found" });
        }
        const messages = await Message.find({
            _id: { $in: conversation.messages }
        }).sort({ createdAt: 1 }); // Sort messages by creation time in ascending order
        res.status(200).json({ messages });
    } catch (error) {
        console.error("Get messages error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};