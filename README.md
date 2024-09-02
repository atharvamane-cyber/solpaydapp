

# Solana DApp - Next.js Frontend

This project is a decentralized application (DApp) built on the Solana blockchain. The frontend is developed using Next.js. The application allows users to send SOL to other users by integrating their wallet.

## Features

- **Wallet Integration**: Connect your Solana wallet (e.g., Phantom, Solflare) to the DApp.
- **Send SOL**: Easily transfer SOL tokens to other users.
- **Transaction History**: View recent transactions and balances.
- **Responsive UI**: Optimized for desktop and mobile devices.

## Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/) (React framework)
- **Blockchain**: [Solana](https://solana.com/)
- **Wallet Integration**: [@solana/web3.js](https://github.com/solana-labs/solana-web3.js), [Solana Pay](https://solanapay.com/)

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- Yarn or npm
- A Solana wallet (e.g., Phantom, Solflare)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/atharvamane-cyber/solpaydapp.git
   cd solpaydapp
   ```

2. **Install dependencies**:
   ```bash
   yarn install
   ```
   or
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file in the root directory and add the necessary environment variables.

   Example:
   ```
   NEXT_PUBLIC_SOLANA_NETWORK=devnet
   NEXT_PUBLIC_RPC_URL=https://api.devnet.solana.com
   ```

4. **Run the development server**:
   ```bash
   yarn dev
   ```
   or
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the app in action.

### Deployment

This project can be easily deployed to Vercel.

1. **Deploy to Vercel**:
   - Create an account on [Vercel](https://vercel.com/).
   - Connect your GitHub repository to Vercel.
   - Vercel will automatically build and deploy your project.

2. **Set up environment variables on Vercel**:
   - Go to your project dashboard on Vercel.
   - Under "Settings" -> "Environment Variables", add the same variables as in your `.env.local`.

3. **Custom Domain**:
   - You can set up a custom domain for your project under "Domains" in your Vercel dashboard.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements.

## License

This project is licensed under the MIT License.

---

