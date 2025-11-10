import React from 'react';
import { Email } from '../types';

interface EmailInboxModalProps {
    emails: Email[];
    onReply: (email: Email) => void;
    resultMessage: string | null;
    onClose: () => void;
}

const EmailListItem: React.FC<{ email: Email; onReply: () => void }> = ({ email, onReply }) => (
    <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-sm text-gray-500"><strong>From:</strong> {email.from}</p>
                <p className="font-semibold text-gray-800"><strong>Subject:</strong> {email.subject}</p>
            </div>
            <button
                onClick={onReply}
                className="ml-4 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition"
            >
                Reply
            </button>
        </div>
        <hr className="my-2" />
        <p className="text-gray-700 whitespace-pre-wrap text-sm">{email.body}</p>
    </div>
);

const EmailInboxModal: React.FC<EmailInboxModalProps> = ({ emails, onReply, resultMessage, onClose }) => {
    const hasEmailsToReply = emails.length > 0;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-40">
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-2xl max-w-3xl w-full">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {hasEmailsToReply ? "Action Required: Prioritize & Reply" : "Email Phase Complete"}
                    </h2>
                </div>
                
                {hasEmailsToReply ? (
                    <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                        <p className="text-sm text-gray-600 bg-yellow-100 p-3 rounded-md">You have new messages. Reply to them in order of priority, from most to least important.</p>
                        {emails.map((email) => (
                            <EmailListItem key={email.id} email={email} onReply={() => onReply(email)} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center p-4">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Prioritization Result</h3>
                        <p className="text-gray-700 bg-gray-100 p-4 rounded-lg">{resultMessage}</p>
                        <button
                            onClick={onClose}
                            className="w-full mt-6 py-3 px-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300"
                        >
                            Continue to Next Stage
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmailInboxModal;