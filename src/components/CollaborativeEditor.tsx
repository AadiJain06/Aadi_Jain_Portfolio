import React, { useEffect, useRef, useState } from 'react';
import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import { MonacoBinding } from 'y-monaco';
import * as monaco from 'monaco-editor';
import { motion } from 'framer-motion';

interface CollaborativeEditorProps {
  roomId: string;
  initialContent?: string;
}

export const CollaborativeEditor: React.FC<CollaborativeEditorProps> = ({
  roomId,
  initialContent = '',
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [activeUsers, setActiveUsers] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!editorRef.current) return;

    // Initialize YJS document
    const ydoc = new Y.Doc();
    const provider = new WebrtcProvider(`collaborative-editor-${roomId}`, ydoc, {
      signaling: ['wss://signaling.yjs.dev'],
    });

    // Create Monaco Editor
    const editor = monaco.editor.create(editorRef.current, {
      value: initialContent,
      language: 'typescript',
      theme: 'vs-dark',
      automaticLayout: true,
      minimap: {
        enabled: false,
      },
      fontSize: 14,
      lineNumbers: 'on',
      roundedSelection: true,
      scrollBeyondLastLine: false,
      readOnly: false,
    });

    // Create YJS text type
    const ytext = ydoc.getText('monaco');

    // Bind Monaco editor to YJS
    new MonacoBinding(
      ytext,
      editor.getModel()!,
      new Set([editor]),
      provider.awareness
    );

    // Handle awareness (cursor positions, selections)
    provider.awareness.setLocalStateField('user', {
      name: `User-${Math.floor(Math.random() * 1000)}`,
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    });

    provider.awareness.on('change', () => {
      const states = Array.from(provider.awareness.getStates().values());
      setActiveUsers(states.map((state: any) => state.user.name));
    });

    provider.on('status', ({ connected }: { connected: boolean }) => {
      setIsConnected(connected);
    });

    return () => {
      editor.dispose();
      provider.destroy();
      ydoc.destroy();
    };
  }, [roomId, initialContent]);

  return (
    <motion.div
      className="relative rounded-lg overflow-hidden shadow-xl bg-gray-900"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute top-0 right-0 z-10 p-4 bg-gray-800 rounded-bl-lg">
        <div className="flex items-center space-x-2">
          <div
            className={`w-2 h-2 rounded-full ${
              isConnected ? 'bg-green-500' : 'bg-red-500'
            }`}
          />
          <span className="text-sm text-white">
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
        <div className="mt-2">
          <p className="text-xs text-gray-400">Active Users:</p>
          <div className="flex flex-wrap gap-1 mt-1">
            {activeUsers.map((user) => (
              <span
                key={user}
                className="px-2 py-1 text-xs bg-gray-700 rounded-full text-white"
              >
                {user}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div
        ref={editorRef}
        className="w-full h-[500px]"
        style={{ paddingTop: '40px' }}
      />
    </motion.div>
  );
}; 