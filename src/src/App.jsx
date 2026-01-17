import React, { useState, useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID, getParsedTokenAccountsByOwner } from '@solana/spl-token';

const SOLANA_RPC = 'https://api.mainnet-beta.solana.com';
const connection = new Connection(SOLANA_RPC, 'confirmed');

function App() {
const [walletAddress, setWalletAddress] = useState('');
const [tokens, setTokens] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const [mindshareScores, setMindshareScores] = useState({});

const fetchTokens = async () => {
if (!walletAddress) return;

setLoading(true);
setError(null);
setTokens([]);
setMindshareScores({});

try {
let pubKey;
try {
pubKey = new PublicKey(walletAddress);
} catch (err) {
throw new Error('Invalid Solana wallet address');
}

const tokenAccounts = await getParsedTokenAccountsByOwner(
connection,
pubKey,
{ programId: TOKEN_PROGRAM_ID }
);

const tokenList = [];

for (const { pubkey, account } of tokenAccounts.value) {
const parsedInfo = account.data.parsed.info;
const mint = parsedInfo.mint;
const balance = parsedInfo.tokenAmount.uiAmount;

if (balance > 0) {
// Placeholder: In a real app you'd fetch metadata via metaplex or token list
const tokenName = mint.slice(0, 8) + '...'; // fallback name
const symbol = '???';

tokenList.push({
mint,
name: tokenName,
symbol,
balance,
account: pubkey.toBase58(),
});
}
}

setTokens(tokenList);

// Placeholder mindshare calculation (expand this!)
const scores = {};
tokenList.forEach((token) => {
// Example dummy logic: higher balance = higher mindshare
scores[token.mint] = Math.min(100, token.balance * 10);
});
setMindshareScores(scores);

} catch (err) {
console.error(err);
setError(err.message || 'Failed to fetch token accounts');
} finally {
setLoading(false);
}
};

const handleSubmit = (e) => {
e.preventDefault();
fetchTokens();
};

return (
<div className="app-container">
<header className="header">
<h1>Solana Token Mindshare Tracker</h1>
<p>Enter a Solana wallet to see token holdings + estimated mindshare</p>
</header>

<form onSubmit={handleSubmit} className="wallet-form">
<input
type="text"
value={walletAddress}
onChange={(e) => setWalletAddress(e.target.value.trim())}
placeholder="Solana wallet address (e.g. 5FHwkrdxntdK24hgkU7N2VufmK9W6iXrrHiSoyeD9G5c)"
className="wallet-input"
/>
<button type="submit" disabled={loading || !walletAddress}>
{loading ? 'Loading...' : 'Track Tokens'}
</button>
</form>

{error && <div className="error-message">{error}</div>}

{tokens.length > 0 ? (
<div className="token-list">
<h2>Your Tokens ({tokens.length})</h2>
<table className="token-table">
<thead>
<tr>
<th>Token</th>
<th>Symbol</th>
<th>Balance</th>
<th>Mindshare Score</th>
<th>Mint (short)</th>
</tr>
</thead>
<tbody>
{tokens.map((token) => (
<tr key={token.mint}>
<td>{token.name}</td>
<td>{token.symbol}</td>
<td>{token.balance.toLocaleString()}</td>
<td>{mindshareScores[token.mint]?.toFixed(1) || 'N/A'}</td>
<td>{token.mint.slice(0, 8)}...</td>
</tr>
))}
</tbody>
</table>

<div className="info-box">
<p><strong>Note:</strong> Mindshare scores are currently placeholders.</p>
<p>You can enhance this by integrating:</p>
<ul>
<li>Dexscreener / Birdeye API for volume & social buzz</li>
<li>Metaplex token metadata for real names/symbols/images</li>
<li>X/Twitter sentiment analysis</li>
</ul>
</div>
</div>
) : (
!loading && walletAddress && (
<p className="no-tokens">No SPL tokens found in this wallet (or try a different address).</p>
)
)}

{loading && <div className="loading">Fetching token holdings...</div>}
</div>
);
}

export default App;
