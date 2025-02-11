const { ConversationModel } = require("../models/ConversationModel")

const getConversation = async(currentUserId) => {
    if(currentUserId) {
        const currentUserConversation = await ConversationModel.find({
            "$or" : [
                { sender : currentUserId },
                { receiver : currentUserId }
            ]
        }).sort({ updatedAt : -1 }).populate('messages').populate('sender').populate('receiver')

        const conversation = currentUserConversation.map((chat) => {
            const countUnseenMsg = chat.messages.reduce((prev, curr) => {
                const msgByUserId = curr?.msgByUserId?.toString()

                if(msgByUserId !== currentUserId) {
                    return prev + (curr.seen ? 0 : 1)
                } else {
                    return prev
                }
            }, 0)
            
            return{
                _id : chat?._id,
                sender : chat?.sender,
                receiver : chat?.receiver,
                unseenMsg : countUnseenMsg,
                lastMsg : chat.messages[chat?.messages.length - 1]
            }
        })

        return conversation
    } else {
        return []
    }
}

module.exports = getConversation