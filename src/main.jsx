import React, { useState, useEffect } from ‘react’;
import { Search, TrendingUp, Twitter, Plus, X, Zap, BarChart3, Activity, Sparkles } from ‘lucide-react’;
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from ‘recharts’;

const SolanaTokenTracker = () => {
const [tokens, setTokens] = useState([]);
const [newToken, setNewToken] = useState({ name: ‘’, address: ‘’ });
const [selectedToken, setSelectedToken] = useState(null);
const [showAddForm, setShowAddForm] = useState(false);
const [searchTerm, setSearchTerm] = useState(’’);
const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

useEffect(() => {
loadTokens();

```
const handleMouseMove = (e) => {
setMousePos({ x: e.clientX, y: e.clientY });
};

window.addEventListener('mousemove', handleMouseMove);
return () => window.removeEventListener('mousemove', handleMouseMove);
```

}, []);

const loadTokens = async () => {
try {
const stored = await window.storage.get(‘solana-tokens’);
if (stored && stored.value) {
setTokens(JSON.parse(stored.value));
}
} catch (error) {
console.log(‘No stored tokens found, starting fresh’);
}
};

const saveTokens = async (updatedTokens) => {
try {
await window.storage.set(‘solana-tokens’, JSON.stringify(updatedTokens));
setTokens(updatedTokens);
} catch (error) {
console.error(‘Failed to save tokens:’, error);
}
};

const generateMockMindshareData = () => {
const days = [‘Mon’, ‘Tue’, ‘Wed’, ‘Thu’, ‘Fri’, ‘Sat’, ‘Sun’];
return days.map(day => ({
day,
mentions: Math.floor(Math.random() * 1000) + 100,
sentiment: Math.random() * 100,
engagement: Math.floor(Math.random() * 5000) + 1000
}));
};

const addToken = () => {
if (!newToken.name || !newToken.address) return;

```
const token = {
id: Date.now(),
name: newToken.name,
address: newToken.address,
addedAt: new Date().toISOString(),
mindshareData: generateMockMindshareData(),
totalMentions: Math.floor(Math.random() * 5000) + 500,
weeklyGrowth: (Math.random() * 40 - 10).toFixed(1),
sentiment: (Math.random() * 30 + 60).toFixed(1),
marketCap: (Math.random() * 100000000).toFixed(0),
volume24h: (Math.random() * 10000000).toFixed(0)
};

const updated = [...tokens, token];
saveTokens(updated);
setNewToken({ name: '', address: '' });
setShowAddForm(false);
```

};

const removeToken = (id) => {
const updated = tokens.filter(t => t.id !== id);
saveTokens(updated);
if (selectedToken?.id === id) {
setSelectedToken(null);
}
};

const refreshData = (tokenId) => {
const updated = tokens.map(t => {
if (t.id === tokenId) {
return {
…t,
mindshareData: generateMockMindshareData(),
totalMentions: Math.floor(Math.random() * 5000) + 500,
weeklyGrowth: (Math.random() * 40 - 10).toFixed(1),
sentiment: (Math.random() * 30 + 60).toFixed(1),
marketCap: (Math.random() * 100000000).toFixed(0),
volume24h: (Math.random() * 10000000).toFixed(0)
};
}
return t;
});
saveTokens(updated);
if (selectedToken?.id === tokenId) {
setSelectedToken(updated.find(t => t.id === tokenId));
}
};

const filteredTokens = tokens.filter(t =>
t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
t.address.toLowerCase().includes(searchTerm.toLowerCase())
);

return (
<div className="min-h-screen bg-black text-white overflow-hidden relative">
{/* Animated Background */}
<div className="fixed inset-0 z-0">
<div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20"></div>

```
{/* Animated Grid */}
<div
className="absolute inset-0 opacity-20"
style={{
backgroundImage: `
linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
`,
backgroundSize: '50px 50px',
animation: 'gridMove 20s linear infinite'
}}
></div>

{/* Floating Particles */}
{[...Array(30)].map((_, i) => (
<div
key={i}
className="absolute rounded-full"
style={{
width: Math.random() * 4 + 2 + 'px',
height: Math.random() * 4 + 2 + 'px',
left: Math.random() * 100 + '%',
top: Math.random() * 100 + '%',
background: `radial-gradient(circle, ${
i % 3 === 0 ? '#a78bfa' : i % 3 === 1 ? '#06b6d4' : '#14f195'
}, transparent)`,
animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
animationDelay: Math.random() * 5 + 's'
}}
></div>
))}

{/* Cursor Glow */}
<div
className="absolute w-96 h-96 rounded-full pointer-events-none transition-all duration-300"
style={{
left: mousePos.x - 192,
top: mousePos.y - 192,
background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15), transparent 70%)',
}}
></div>
</div>

<div className="relative z-10 max-w-7xl mx-auto p-6">
{/* Header */}
<div className="mb-12 text-center relative">
<div className="inline-block relative">
<h1 className="text-6xl font-black mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
SOLANA MINDSHARE
</h1>
<div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg blur opacity-30 animate-pulse"></div>
</div>
<p className="text-xl text-cyan-300 font-semibold tracking-wider">
<Zap className="inline mr-2" size={20} />
TRACK THE PULSE OF WEB3
</p>

{/* Animated Stats Bar */}
<div className="mt-8 flex justify-center gap-8 text-sm">
<div className="relative px-6 py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-500/30">
<div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/20 to-purple-500/0 animate-shimmer"></div>
<span className="text-purple-300">🔥 TRENDING NOW</span>
</div>
<div className="relative px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg border border-cyan-500/30">
<div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-cyan-500/0 animate-shimmer"></div>
<span className="text-cyan-300">⚡ LIVE DATA</span>
</div>
</div>
</div>

{/* Search and Add */}
<div className="mb-8 flex gap-4">
<div className="flex-1 relative group">
<Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400 z-10" size={20} />
<input
type="text"
placeholder="Search tokens by name or address..."
value={searchTerm}
onChange={(e) => setSearchTerm(e.target.value)}
className="w-full pl-12 pr-4 py-4 bg-gradient-to-r from-purple-900/40 to-cyan-900/40 border-2 border-purple-500/30 rounded-xl focus:outline-none focus:border-purple-500 transition-all backdrop-blur-sm"
/>
<div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-cyan-500/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
</div>
<button
onClick={() => setShowAddForm(!showAddForm)}
className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 rounded-xl font-bold flex items-center gap-2 transition-all transform hover:scale-105 shadow-lg shadow-green-500/50"
>
<Plus size={20} />
ADD TOKEN
</button>
</div>

{/* Add Token Form */}
{showAddForm && (
<div className="mb-8 p-8 bg-gradient-to-br from-purple-900/40 via-black/40 to-cyan-900/40 border-2 border-purple-500/30 rounded-2xl backdrop-blur-md relative overflow-hidden">
<div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-cyan-500/5 animate-shimmer"></div>
<h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">ADD NEW TOKEN</h3>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
<input
type="text"
placeholder="Token Name (e.g., $PUMP)"
value={newToken.name}
onChange={(e) => setNewToken({ ...newToken, name: e.target.value })}
className="px-4 py-3 bg-black/50 border-2 border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 transition-all"
/>
<input
type="text"
placeholder="Contract Address"
value={newToken.address}
onChange={(e) => setNewToken({ ...newToken, address: e.target.value })}
className="px-4 py-3 bg-black/50 border-2 border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-500 transition-all"
/>
</div>
<div className="mt-6 flex gap-3 relative z-10">
<button
onClick={addToken}
className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-lg font-bold transition-all transform hover:scale-105"
>
ADD TOKEN
</button>
<button
onClick={() => setShowAddForm(false)}
className="px-8 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-bold transition-all"
>
CANCEL
</button>
</div>
</div>
)}

{/* Tokens Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
{filteredTokens.map((token, idx) => (
<div
key={token.id}
className="group p-6 bg-gradient-to-br from-purple-900/30 via-black/50 to-cyan-900/30 border-2 border-purple-500/20 rounded-2xl hover:border-purple-500/60 transition-all cursor-pointer relative overflow-hidden backdrop-blur-sm transform hover:scale-105"
onClick={() => setSelectedToken(token)}
style={{ animationDelay: `${idx * 0.1}s` }}
>
<div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity animate-shimmer"></div>

<div className="flex justify-between items-start mb-4 relative z-10">
<div>
<div className="flex items-center gap-2 mb-2">
<Sparkles className="text-yellow-400 animate-pulse" size={20} />
<h3 className="text-2xl font-black bg-gradient-to-r from-purple-300 to-cyan-300 bg-clip-text text-transparent">
{token.name}
</h3>
</div>
<p className="text-xs text-gray-400 font-mono truncate max-w-[200px]">
{token.address}
</p>
</div>
<button
onClick={(e) => {
e.stopPropagation();
removeToken(token.id);
}}
className="text-red-400 hover:text-red-300 transition-colors"
>
<X size={18} />
</button>
</div>

<div className="space-y-3 relative z-10">
<div className="flex justify-between items-center p-3 bg-black/30 rounded-lg">
<span className="text-cyan-300 flex items-center gap-2 font-semibold">
<Twitter size={16} className="animate-pulse" /> Mentions
</span>
<span className="font-black text-xl text-white">{token.totalMentions.toLocaleString()}</span>
</div>

<div className="flex justify-between items-center p-3 bg-black/30 rounded-lg">
<span className="text-purple-300 font-semibold">7d Growth</span>
<span className={`font-black text-xl ${parseFloat(token.weeklyGrowth) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
{parseFloat(token.weeklyGrowth) >= 0 ? '↗' : '↘'} {token.weeklyGrowth}%
</span>
</div>

<div className="flex justify-between items-center p-3 bg-black/30 rounded-lg">
<span className="text-pink-300 font-semibold">Sentiment</span>
<span className="font-black text-xl text-blue-400">{token.sentiment}%</span>
</div>
</div>

<button
onClick={(e) => {
e.stopPropagation();
refreshData(token.id);
}}
className="mt-4 w-full py-3 bg-gradient-to-r from-purple-600/50 to-cyan-600/50 hover:from-purple-600 hover:to-cyan-600 rounded-lg font-bold transition-all transform hover:scale-105 relative z-10"
>
<Activity className="inline mr-2" size={16} />
REFRESH DATA
</button>
</div>
))}
</div>

{filteredTokens.length === 0 && (
<div className="text-center py-20">
<div className="inline-block p-8 bg-gradient-to-br from-purple-900/20 to-cyan-900/20 border-2 border-purple-500/30 rounded-2xl">
<BarChart3 className="mx-auto mb-4 text-purple-400" size={64} />
<p className="text-2xl mb-2 font-bold text-purple-300">No Tokens Found</p>
<p className="text-gray-400">Add a token to start tracking mindshare</p>
</div>
</div>
)}

{/* Detailed View */}
{selectedToken && (
<div className="p-8 bg-gradient-to-br from-purple-900/40 via-black/60 to-cyan-900/40 border-2 border-purple-500/40 rounded-2xl backdrop-blur-md relative overflow-hidden">
<div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-cyan-500/5 animate-shimmer"></div>

<div className="flex justify-between items-start mb-8 relative z-10">
<div>
<h2 className="text-5xl font-black mb-3 bg-gradient-to-r from-purple-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent">
{selectedToken.name}
</h2>
<p className="text-gray-400 font-mono text-sm mb-4">{selectedToken.address}</p>
<div className="flex gap-4">
<div className="px-4 py-2 bg-purple-500/20 border border-purple-500/40 rounded-lg">
<span className="text-purple-300 text-sm">Market Cap: ${parseInt(selectedToken.marketCap).toLocaleString()}</span>
</div>
<div className="px-4 py-2 bg-cyan-500/20 border border-cyan-500/40 rounded-lg">
<span className="text-cyan-300 text-sm">24h Vol: ${parseInt(selectedToken.volume24h).toLocaleString()}</span>
</div>
</div>
</div>
<button
onClick={() => setSelectedToken(null)}
className="text-gray-400 hover:text-white transition-colors"
>
<X size={32} />
</button>
</div>

{/* Stats Cards */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 relative z-10">
<div className="p-6 bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-2 border-purple-500/40 rounded-xl backdrop-blur-sm">
<p className="text-purple-300 mb-2 font-semibold text-sm">TOTAL MENTIONS</p>
<p className="text-4xl font-black text-white">{selectedToken.totalMentions.toLocaleString()}</p>
<div className="mt-2 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
</div>
<div className="p-6 bg-gradient-to-br from-green-600/20 to-emerald-600/20 border-2 border-green-500/40 rounded-xl backdrop-blur-sm">
<p className="text-green-300 mb-2 font-semibold text-sm">WEEKLY GROWTH</p>
<p className={`text-4xl font-black ${parseFloat(selectedToken.weeklyGrowth) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
{selectedToken.weeklyGrowth}%
</p>
<div className="mt-2 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
</div>
<div className="p-6 bg-gradient-to-br from-cyan-600/20 to-blue-600/20 border-2 border-cyan-500/40 rounded-xl backdrop-blur-sm">
<p className="text-cyan-300 mb-2 font-semibold text-sm">SENTIMENT SCORE</p>
<p className="text-4xl font-black text-blue-400">{selectedToken.sentiment}%</p>
<div className="mt-2 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
</div>
</div>

{/* Charts */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
<div className="bg-black/40 p-6 rounded-xl border-2 border-purple-500/30 backdrop-blur-sm">
<h3 className="text-xl font-bold mb-4 text-purple-300">WEEKLY MENTIONS</h3>
<ResponsiveContainer width="100%" height={250}>
<AreaChart data={selectedToken.mindshareData}>
<defs>
<linearGradient id="colorMentions" x1="0" y1="0" x2="0" y2="1">
<stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
<stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
</linearGradient>
</defs>
<CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
<XAxis dataKey="day" stroke="#a78bfa" />
<YAxis stroke="#a78bfa" />
<Tooltip
contentStyle={{ backgroundColor: '#000', border: '2px solid #8b5cf6', borderRadius: '8px' }}
/>
<Area type="monotone" dataKey="mentions" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorMentions)" />
</AreaChart>
</ResponsiveContainer>
</div>

<div className="bg-black/40 p-6 rounded-xl border-2 border-cyan-500/30 backdrop-blur-sm">
<h3 className="text-xl font-bold mb-4 text-cyan-300">SENTIMENT TREND</h3>
<ResponsiveContainer width="100%" height={250}>
<BarChart data={selectedToken.mindshareData}>
<defs>
<linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
<stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
<stop offset="95%" stopColor="#3b82f6" stopOpacity={0.8}/>
</linearGradient>
</defs>
<CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
<XAxis dataKey="day" stroke="#22d3ee" />
<YAxis stroke="#22d3ee" />
<Tooltip
contentStyle={{ backgroundColor: '#000', border: '2px solid #06b6d4', borderRadius: '8px' }}
/>
<Bar dataKey="sentiment" fill="url(#colorBar)" radius={[8, 8, 0, 0]} />
</BarChart>
</ResponsiveContainer>
</div>
</div>

<div className="mt-6 p-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-2 border-blue-500/40 rounded-xl backdrop-blur-sm relative z-10">
<p className="text-sm text-blue-200">
<Zap className="inline mr-2" size={16} />
<strong>ALPHA NOTE:</strong> This demo uses simulated data. Production version connects to X API and real-time Solana blockchain data for live tracking.
</p>
</div>
</div>
)}
</div>

<style jsx>{`
@keyframes float {
0%, 100% { transform: translateY(0) translateX(0); }
50% { transform: translateY(-20px) translateX(10px); }
}
@keyframes gridMove {
0% { transform: translateY(0); }
100% { transform: translateY(50px); }
}
@keyframes shimmer {
0% { transform: translateX(-100%); }
100% { transform: translateX(100%); }
}
.animate-shimmer {
animation: shimmer 3s infinite;
}
`}</style>
</div>
```

);
};

export default SolanaTokenTracker;
