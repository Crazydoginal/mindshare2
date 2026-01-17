import React, { useState, useEffect } from “react”;
import { Search, TrendingUp, Twitter, Plus, X, Zap, Activity, Heart, Eye, MessageCircle, Clock, Users, Share2, Bell, AlertTriangle, Shield, Target, Flame, GitCompare, Smile } from “lucide-react”;
<div key={i} className="p-3 bg-black/40 border border-gray-700 rounded-xl">
<item.icon size={18} className="mb-1 text-blue-400" />
<p className="text-xs text-gray-400">{item.label}</p>
<p className="text-2xl font-black">{item.value}</p>
</div>
))}
</div>

<div className="grid grid-cols-4 gap-3 mb-4">
{[
{icon: MessageCircle, label: "Replies", value: selectedToken.totalReplies.toLocaleString()},
{icon: Share2, label: "Retweets", value: selectedToken.totalRetweets.toLocaleString()},
{icon: Users, label: "Authors", value: selectedToken.uniqueAuthors.toLocaleString()},
{icon: Activity, label: "Sentiment", value: `${selectedToken.sentiment}%`}
].map((item, i) => (
<div key={i} className="p-2 bg-black/30 border border-gray-700 rounded-lg">
<item.icon className="text-cyan-400" size={14} />
<Shield className="mx-auto mb-2 text-green-400" size={24} />
<p className="text-sm text-green-300 mb-1">Loyalty Index</p>
<p className="text-3xl font-black">{selectedToken.loyaltyIndex}%</p>
</div>
<div className="p-4 bg-cyan-600/20 border border-cyan-500/30 rounded-xl text-center">
<Target className="mx-auto mb-2 text-cyan-400" size={24} />
<p className="text-sm text-cyan-300 mb-1">Organic Growth</p>
<p className="text-3xl font-black">{selectedToken.organicGrowth}%</p>
</div>
<div className="p-4 bg-red-600/20 border border-red-500/30 rounded-xl text-center">
<AlertTriangle className="mx-auto mb-2 text-red-400" size={24} />
<p className="text-sm text-red-300 mb-1">Bot Activity</p>
<p className="text-3xl font-black">{selectedToken.botPercentage}%</p>
<div className="mt-4 bg-indigo-900/20 p-4 rounded-xl border border-indigo-500/30">
<h3 className="font-bold mb-3 text-indigo-300 flex items-center gap-2">
<Smile size={18} />Emotion Analysis
</h3>
<div className="grid grid-cols-5 gap-2">
{selectedToken.emotionData.map((emotion, i) => (
<div key={i} className="text-center">
<div className="h-20 bg-black/30 rounded-lg mb-2 flex items-end justify-center p-2">
<div style={{height: `${emotion.value}%`, backgroundColor: emotion.color}} className="w-full rounded-t"></div>
</div>
<p className="text-xs font-semibold" style={{color: emotion.color}}>{emotion.emotion}</p>
<p className="text-sm font-bold">{emotion.value}%</p>
</div>
))}
</div>
</div>
</>
)}

{activeTab === "competition" && (
<div className="space-y-3">
{selectedToken.competitors.map((comp, i) => (
<div key={i} className={`p-3 rounded-lg border ${comp.name === selectedToken.name ? "bg-purple-500/20 border-purple-500/40" : "bg-black/30 border-gray-700"}`}>
<div className="flex justify-between items-center mb-2">
<span className="font-bold text-lg">{comp.name}</span>
<span className={`font-bold ${comp.growth >= 0 ? "text-green-400" : "text-red-400"}`}>{comp.growth >= 0 ? "↗" : "↘"} {comp.growth}%</span>
</div>
<div className="grid grid-cols-2 gap-2 text-sm">
<div><span className="text-gray-400">Mentions: </span><span className="font-semibold">{comp.mentions.toLocaleString()}</span></div>
<div><span className="text-gray-400">Sentiment: </span><span className="font-semibold text-blue-400">{comp.sentiment}%</span></div>
</div>
</div>
))}
</div>
)}

{activeTab === "alerts" && (
<div className="space-y-3">
{selectedToken.alerts.map(alert => (
<div key={alert.id} className={`p-4 rounded-xl border-2 ${alert.severity === "high" ? "bg-red-500/10 border-red-500/40" : "bg-yellow-500/10 border-yellow-500/40"}`}>
<div className="flex items-start gap-3">
<Bell className={alert.severity === "high" ? "text-red-400" : "text-yellow-400"} size={20} />
<div className="flex-1">
<div className="flex justify-between items-start mb-1">
<h4 className="font-bold">{alert.title}</h4>
<span className="text-xs text-gray-400">{alert.time}</span>
</div>
<p className="text-sm text-gray-300">{alert.message}</p>
</div>
</div>
</div>
))}
</div>
)}
</div>
)}
</div>

<style>{`
@keyframes float { 0%, 100% { transform: translateY(0) translateX(0); } 50% { transform: translateY(-20px) translateX(10px); } }
@keyframes gridMove { 0% { transform: translateY(0); } 100% { transform: translateY(50px); } }
`}</style>
</div>
```

);
};

export default SolanaTokenTracker;
