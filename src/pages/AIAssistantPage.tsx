import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, Send, User, Network, FileText, Eye, Info, Sparkles, RotateCcw, Copy } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  entities?: string[];
  evidence?: string[];
  action?: { label: string; type: string };
  timestamp: string;
}

const SUGGESTED_QUESTIONS = [
  'Find people connected to Ahmed Rahman within 2 hops.',
  'What evidence connects Ahmed Rahman and Ravi Kumar?',
  'Show transactions above ₹50,000.',
  'Which cases share common entities?',
  'What changed in the network recently?',
  'Summarize the current investigation.',
  'Which entities have the most connections?',
  'Show cross-case relationships.',
];

const MOCK_RESPONSES: Record<string, Omit<Message, 'id' | 'role' | 'timestamp'>> = {
  default: {
    content: 'I can help you analyse entities, relationships, transactions, and investigation indicators across your cases. Please ask a specific question about the investigation data.',
  },
  ahmed: {
    content: 'Within 2 hops from Ahmed Rahman, I identified **14 connected entities** across Cases CASE-1024 and CASE-1031:\n\n**Direct connections (1 hop):** Harish Nanda (CALLS, 47 calls), Ravi Kumar (KNOWS), Imran Shaikh (CALLS), Rahul Textiles Pvt. Ltd. (WORKS_FOR), Crescent Import-Export (ASSOCIATED_WITH)\n\n**Extended connections (2 hops):** Suresh Pillai (via Harish Nanda), Intercargo Freight (via Harish Nanda), Unknown Account (via Imran Shaikh), Farida Begum (via Crescent Import-Export)\n\nNote: 3 cross-case connections detected in the extended network.',
    entities: ['Ahmed Rahman', 'Harish Nanda', 'Ravi Kumar', 'Imran Shaikh', 'Suresh Pillai'],
    evidence: ['EVD-002 (CDR)', 'EVD-003 (Transactions)', 'EVD-011 (Intelligence Report)'],
    action: { label: 'View on Graph', type: 'graph' },
  },
  evidence: {
    content: 'Evidence connecting Ahmed Rahman and Ravi Kumar across CASE-1024:\n\n**1. Transaction Chain (EVD-003):** RTGS transfer of ₹95,000 from Ahmed Rahman → Harish Nanda → Ravi Kumar within 48 hours.\n\n**2. CDR Records (EVD-002):** 12 calls between Ahmed Rahman (PH-001) and Ravi Kumar (PH-002) in September 2026.\n\n**3. Location Overlap (EVD-004):** Both entities co-located at Silk Mills Warehouse and Bhiwandi Freight Depot on 3 separate occasions.\n\n**4. Vehicle Records (EVD-004):** Vehicles GJ-01-AB-1234 and PB-10-CD-5678 detected at same location.',
    entities: ['Ahmed Rahman', 'Ravi Kumar', 'Harish Nanda'],
    evidence: ['EVD-002', 'EVD-003', 'EVD-004'],
    action: { label: 'View Evidence', type: 'evidence' },
  },
  transactions: {
    content: 'Found **9 transactions above ₹50,000** across active cases:\n\n| ID | Sender | Receiver | Amount | Date |\n|---|---|---|---|---|\n| TXN-014 | Rahul Textiles | Ahmed Rahman | ₹4,80,000 | Sep 18 |\n| TXN-010 | Ahmed Rahman | Crescent Import | ₹3,20,000 | Sep 16 |\n| TXN-009 | Harish Nanda | Intercargo | ₹2,10,000 | Sep 14 |\n| TXN-005 | Suresh Pillai | Karim Ansari | ₹1,50,000 | Sep 5 |\n| TXN-006 | Karim Ansari | Global Gems | ₹1,45,000 | Sep 6 |\n| TXN-015 | Ravi Kumar | Sunrise Logistics | ₹1,25,000 | Sep 20 |\n\n**Alert:** TXN-001 to TXN-004 form a rapid transfer chain totalling ₹3,63,000 within 48 hours.',
    entities: ['Ahmed Rahman', 'Harish Nanda', 'Ravi Kumar', 'Karim Ansari'],
    evidence: ['EVD-003', 'EVD-008'],
    action: { label: 'View Transactions', type: 'transactions' },
  },
  cases: {
    content: 'Cross-case entity overlaps detected:\n\n**CASE-1024 ↔ CASE-1031 (High strength)**\n• Shared entity: Ahmed Rahman\n• Shared phone: PH-007\n• Shared location: Bhiwandi Freight Depot\n\n**CASE-1031 ↔ CASE-1059 (Medium strength)**\n• Shared entities: Karim Ansari, Suresh Pillai\n• Shared location: Zaveri Bazaar Exchange\n\n**CASE-1024 ↔ CASE-1067 (High strength)**\n• Shared entities: Harish Nanda, Imran Shaikh\n• Shared vehicles: DL-04-KL-2345\n\nRecommendation: Consider joint investigation protocol for CASE-1024 and CASE-1067.',
    entities: ['Ahmed Rahman', 'Karim Ansari', 'Harish Nanda'],
    action: { label: 'View Cross-Case Intel', type: 'cross-case' },
  },
  summary: {
    content: '**Investigation Summary — Current Case Context (CASE-1024)**\n\nOperation Crimson Ledger involves a network of 23 identified individuals across Gujarat, Punjab, Delhi, and Maharashtra. Key findings:\n\n**Network Structure:** Three distinct communities identified. Harish Nanda and Ahmed Rahman show highest network centrality scores.\n\n**Financial Activity:** A 4-hop rapid transfer chain (₹3,63,000) was detected September 10–12, 2026. Additional structured deposits flagged in connected accounts.\n\n**Cross-Case Connections:** Network overlap with CASE-1031 (Operation Silk Route) detected via shared entity and financial channels.\n\n**Pending Review:** 18 investigation indicators across the case, 6 marked critical/high severity.\n\n*This summary is AI-generated and requires investigator verification before any investigative action.*',
    entities: ['Ahmed Rahman', 'Harish Nanda', 'Ravi Kumar', 'Imran Shaikh'],
    evidence: ['EVD-001', 'EVD-002', 'EVD-003', 'EVD-011'],
    action: { label: 'Generate Report', type: 'report' },
  },
};

const getResponse = (query: string): Omit<Message, 'id' | 'role' | 'timestamp'> => {
  const q = query.toLowerCase();
  if (q.includes('ahmed') || q.includes('2 hop') || q.includes('connected')) return MOCK_RESPONSES.ahmed;
  if (q.includes('evidence') || q.includes('connect')) return MOCK_RESPONSES.evidence;
  if (q.includes('transaction') || q.includes('50,000') || q.includes('₹')) return MOCK_RESPONSES.transactions;
  if (q.includes('case') || q.includes('common') || q.includes('share')) return MOCK_RESPONSES.cases;
  if (q.includes('summar') || q.includes('current') || q.includes('overview')) return MOCK_RESPONSES.summary;
  return MOCK_RESPONSES.default;
};

export const AIAssistantPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content: 'Hello. I am the Netra Investigation Assistant — an AI analytical tool designed to help you explore entity relationships, evidence connections, and network patterns across your cases.\n\nPlease note: I provide analytical insights to support human investigation. All outputs require investigator review and do not constitute evidence of any offence.',
      timestamp: new Date().toLocaleTimeString(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = (text?: string) => {
    const query = text || input.trim();
    if (!query) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: query, timestamp: new Date().toLocaleTimeString() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    setTimeout(() => {
      const resp = getResponse(query);
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        timestamp: new Date().toLocaleTimeString(),
        ...resp,
      };
      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 1200 + Math.random() * 600);
  };

  const formatContent = (content: string) => {
    return content.split('\n').map((line, i) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return <div key={i} className="font-bold text-slate-900 mt-2 mb-1">{line.replace(/\*\*/g, '')}</div>;
      }
      if (line.includes('**')) {
        const parts = line.split(/\*\*(.*?)\*\*/);
        return (
          <div key={i} className="text-[13px] text-slate-700 mb-1 leading-relaxed">
            {parts.map((part, j) => j % 2 === 1 ? <strong key={j} className="text-slate-900">{part}</strong> : part)}
          </div>
        );
      }
      if (line.startsWith('| ')) {
        return <div key={i} className="font-mono text-[11.5px] text-slate-600 bg-slate-50 px-2 py-0.5 border-b border-slate-100">{line}</div>;
      }
      if (line.startsWith('•')) {
        return <div key={i} className="flex items-start gap-2 text-[12.5px] text-slate-600 mb-0.5 ml-2"><span className="text-blue-500 mt-1 flex-shrink-0">•</span>{line.substring(1)}</div>;
      }
      if (!line.trim()) return <div key={i} className="h-2" />;
      return <div key={i} className="text-[13px] text-slate-700 leading-relaxed">{line}</div>;
    });
  };

  return (
    <div className="flex h-[calc(100vh-56px)] bg-slate-50">
      {/* Sidebar — Suggested Questions */}
      <div className="w-72 bg-white border-r border-slate-200 flex flex-col overflow-y-auto">
        <div className="p-4 border-b border-slate-100">
          <div className="flex items-center gap-2 mb-1">
            <Bot size={15} className="text-blue-600" />
            <h2 className="font-bold text-slate-900 text-[14px]">Investigation Assistant</h2>
          </div>
          <p className="text-[12px] text-slate-400">AI analytical tool for network investigation</p>
        </div>

        <div className="p-4">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-3 flex items-center gap-1.5">
            <Sparkles size={11} />Suggested Questions
          </div>
          <div className="space-y-2">
            {SUGGESTED_QUESTIONS.map((q, i) => (
              <button
                key={i}
                onClick={() => sendMessage(q)}
                className="w-full text-left text-[12px] text-slate-600 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-auto p-4 border-t border-slate-100">
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
            <div className="text-[11px] text-amber-700 font-bold mb-1">Important Notice</div>
            <div className="text-[11px] text-amber-600 leading-snug">AI outputs are analytical signals only. All insights require investigator review.</div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b border-slate-200 px-5 py-3 flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-violet-600 rounded-full flex items-center justify-center">
            <Bot size={16} className="text-white" />
          </div>
          <div>
            <div className="font-semibold text-slate-900 text-[13.5px]">Netra Investigation Assistant</div>
            <div className="text-[11px] text-green-600 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />Online · Analytical mode
            </div>
          </div>
          <button
            className="ml-auto flex items-center gap-1.5 text-[12.5px] text-slate-500 hover:text-slate-800 border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50"
            onClick={() => setMessages([messages[0]])}
          >
            <RotateCcw size={12} />Clear
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.map(msg => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.role === 'user' ? 'bg-blue-700 text-white text-[11px] font-bold' : 'bg-gradient-to-br from-blue-500 to-violet-600'
              }`}>
                {msg.role === 'user' ? 'PM' : <Bot size={14} className="text-white" />}
              </div>
              {/* Bubble */}
              <div className={`max-w-[75%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                <div className={`rounded-2xl px-4 py-3 ${
                  msg.role === 'user'
                    ? 'bg-blue-700 text-white rounded-tr-sm'
                    : 'bg-white border border-slate-200 shadow-sm rounded-tl-sm'
                }`}>
                  {msg.role === 'user' ? (
                    <div className="text-[13px] leading-relaxed">{msg.content}</div>
                  ) : (
                    <div>{formatContent(msg.content)}</div>
                  )}
                </div>

                {/* Entities */}
                {msg.entities && msg.entities.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {msg.entities.map(ent => (
                      <span key={ent} className="text-[11.5px] bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-lg font-medium">{ent}</span>
                    ))}
                  </div>
                )}

                {/* Evidence refs */}
                {msg.evidence && msg.evidence.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {msg.evidence.map(ev => (
                      <span key={ev} className="flex items-center gap-1 text-[11.5px] bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-lg font-medium">
                        <FileText size={10} />{ev}
                      </span>
                    ))}
                  </div>
                )}

                {/* Action button */}
                {msg.action && (
                  <button className="mt-2 flex items-center gap-1.5 text-[12px] font-semibold text-blue-700 border border-blue-300 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors">
                    <Eye size={12} />{msg.action.label}
                  </button>
                )}

                {/* AI disclaimer */}
                {msg.role === 'assistant' && msg.id !== '0' && (
                  <div className="mt-1.5 flex items-center gap-1 text-[10.5px] text-slate-400">
                    <Info size={10} />AI-generated — requires investigator review
                  </div>
                )}

                <div className="text-[10px] text-slate-400 mt-1">{msg.timestamp}</div>
              </div>
            </motion.div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center flex-shrink-0">
                <Bot size={14} className="text-white" />
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-slate-200 p-4">
          <div className="flex items-end gap-3">
            <div className="flex-1 relative">
              <textarea
                rows={2}
                className="w-full resize-none border border-slate-200 rounded-xl px-4 py-3 text-[13.5px] text-slate-800 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-slate-400"
                placeholder="Ask about entities, connections, transactions, patterns..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
              />
            </div>
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || isTyping}
              className="w-10 h-10 bg-blue-700 hover:bg-blue-800 disabled:bg-slate-200 text-white rounded-xl flex items-center justify-center transition-colors flex-shrink-0"
            >
              <Send size={15} />
            </button>
          </div>
          <div className="text-[11px] text-slate-400 mt-1.5 text-center">
            Press Enter to send · Shift+Enter for new line · All outputs require investigator review
          </div>
        </div>
      </div>
    </div>
  );
};
