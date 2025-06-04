import { useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import { menuAgent } from '../../data/menuAgent';
import './assistantia.css';

function AssistantIA() {
    /**
     * This following informations is confidential, please send email to
     * raznambinintsoa3@gmail.com to revocer them.
     */
    const tokenChatbot = '';
    const url = '';
    const modelIA = '';

    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSendMessage = async () => {
        if (!inputMessage.trim()) return;

        const userMessage = { role: 'user', content: inputMessage };
        setMessages((prev) => [...prev, userMessage]);
        setInputMessage('');
        setIsLoading(true);

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${tokenChatbot}`,
                },
                body: JSON.stringify({
                    model: modelIA,
                    messages: [
                        ...messages.map((msg) => ({
                            role: msg.role,
                            content: msg.content,
                        })),
                        userMessage,
                    ],
                }),
            });

            const data = await response.json();
            if (data.choices && data.choices[0].message) {
                const botMessage = {
                    role: 'assistant',
                    content: data.choices[0].message.content,
                };
                setMessages((prev) => [...prev, botMessage]);
            }
        } catch (error) {
            console.error('Erreur lors de la requête API:', error);
            setMessages((prev) => [
                ...prev,
                {
                    role: 'assistant',
                    content: 'Veuillez vérifier votre connexion internet.',
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    useState(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="d-flex flex-row">
            <Menu menu={menuAgent} />

            <div className="flex-grow-1 dashboard-content">
                <Header title={'Assistant IA'} />

                <div className="container-chat">
                    <div className="chat-messages">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`message ${
                                    message.role === 'user'
                                        ? 'user-message'
                                        : 'bot-message'
                                }`}
                            >
                                {message.role === 'user' ? (
                                    message.content
                                ) : (
                                    <ReactMarkdown>
                                        {message.content}
                                    </ReactMarkdown>
                                )}
                            </div>
                        ))}
                        {isLoading && (
                            <div className="message bot-message">
                                <div className="typing-indicator">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="chat-input">
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyPress={(e) =>
                                e.key === 'Enter' && handleSendMessage()
                            }
                            placeholder="Posez votre question..."
                            disabled={isLoading}
                        />
                        <button
                            onClick={handleSendMessage}
                            disabled={isLoading || !inputMessage.trim()}
                        >
                            Envoyer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AssistantIA;
