import { useState, useEffect } from 'react';
import { Address } from 'ton'
import { useTonConnectModal } from '@tonconnect/ui-react';
import { useTonConnectUI } from '@tonconnect/ui-react';
import { getHttpEndpoint } from "@orbs-network/ton-access";
import { TonClient, toNano } from "ton";
const Main = () => {
  const [amount, setAmount] = useState(0)
  const [balance, setBalance] = useState(0)
  const [wallet, setWallet] = useState('')
  const { open: openModal } = useTonConnectModal();
  const [tonConnectUI] = useTonConnectUI();

  useEffect(() => {
    tonConnectUI.onStatusChange(async (wallet) => {
      if (!wallet) setWallet('')
      if (!wallet) setAmount(0)
      if (!wallet) setBalance(0)
      if (!wallet) return;

      const userAddress = Address.parse(wallet?.account.address as string);
      setWallet(userAddress.toString())

      const endpoint = await getHttpEndpoint(); // get the decentralized RPC endpoint
      const client = new TonClient({ endpoint }); // initialize ton library
      const balance = await client.getBalance(userAddress);
      setBalance(Number(balance) / 10000000)
    }, console.error);
  }, [tonConnectUI]);

  return (
    <div className={'main'}>
      <div className={'center'}>
        <h1>how much TONs u want to burn?</h1>
        <br />
        <br />
        <button onClick={() => {
          wallet ? tonConnectUI.disconnect() : openModal()
        }}>
          {wallet ? 'dis' : ''}connect ton wallet
        </button>
        <br />
        <br />
        {wallet ? `Ur wallet: ${wallet.slice(0, 5)}...${wallet.slice(-5)}` : ''}
        <br />
        {wallet ? `Ur balance: ${(balance / 100).toFixed(2)}TONs` : ''}
        <br />
        <br />
        <input max={balance} type={'range'} value={amount} onChange={(e: any) => setAmount(e.target.value)} />
        <br />
        <br />
        WHO NEEDS {amount / 100}TON, RIGHT?
        <br />
        FUCK IT, BURN IT!!! LEEETSSSGOOOOO!!!
        <br />
        <br />
        <button onClick={() => {
          tonConnectUI.sendTransaction({
            validUntil: 99999999999999,
            messages: [
              { address: 'EQDR7bwX5hdlKJNTejlvuXZ2XWG7Of6jmivrNbDKT-XcXKn3', amount: toNano(amount / 100).toString() }
            ]
          })
        }}>
          BURN {amount / 100} TONs!
        </button>
        <br />
        <br />
        <br />
        ~~~~~~~~~~~~~~~~~~~~
        <br />
        Or you can send ANY amount on BURNER smartcontract
        <br />
        <br />
        EQDR7bwX5hdlKJNTejlvuXZ2XWG7Of6jmivrNbDKT-XcXKn3
        <br />
        <br />
        P.S
        you will recieve NFT confirmation!!!
      </div>
    </div>
  );
};

export default Main;
