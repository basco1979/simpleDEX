const contractAddress = '0x76B080f47c917B88D729ce1dFCa0E5756306dBfa'
const contractABI = [
  {
    inputs: [
      { internalType: 'address', name: '_tokenA', type: 'address' },
      { internalType: 'address', name: '_tokenB', type: 'address' },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
    name: 'OwnableInvalidOwner',
    type: 'error',
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amountA',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amountB',
        type: 'uint256',
      },
    ],
    name: 'LiquidityAdded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amountA',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amountB',
        type: 'uint256',
      },
    ],
    name: 'LiquidityRemoved',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'user', type: 'address' },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amountIn',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amountOut',
        type: 'uint256',
      },
    ],
    name: 'TokenSwapped',
    type: 'event',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'amountA', type: 'uint256' },
      { internalType: 'uint256', name: 'amountB', type: 'uint256' },
    ],
    name: 'addLiquidity',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_token', type: 'address' }],
    name: 'getPrice',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'amountA', type: 'uint256' },
      { internalType: 'uint256', name: 'amountB', type: 'uint256' },
    ],
    name: 'removeLiquidity',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'amountAIn', type: 'uint256' }],
    name: 'swapAforB',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'amountBIn', type: 'uint256' }],
    name: 'swapBforA',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'tokenA',
    outputs: [{ internalType: 'contract IERC20', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'tokenB',
    outputs: [{ internalType: 'contract IERC20', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]
const erc20ABI = [
  {
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      { name: '_owner', type: 'address' },
      { name: '_spender', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', type: 'uint256' }],
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: '_spender', type: 'address' },
      { name: '_value', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', type: 'bool' }],
    type: 'function',
  },
]

let provider, signer, dexContract
//const walletAddressInput = document.getElementById('walletAddress')

async function connectWallet() {
            if (typeof window.ethereum !== 'undefined') {
                try {
                    const provider = new ethers.providers.Web3Provider(window.ethereum);
                    const accounts = await provider.send('eth_requestAccounts', []);
                    const walletAddress = accounts[0];
                    document.getElementById('walletStatus').textContent = walletAddress;
                    document.getElementById('connectWalletButton').style.display = 'none';
                } catch (error) {
                    console.error('Error connecting wallet:', error);
                }
            } else {
                alert('MetaMask is not installed. Please install it to connect your wallet.');
            }
        }

async function connectEthers() {
  if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send('eth_requestAccounts', [])
    signer = provider.getSigner()
    dexContract = new ethers.Contract(contractAddress, contractABI, signer)
    console.log('Ethers.js Connected!')
  } else {
    alert('Please install MetaMask!')
  }
}

async function getAccount() {
  return await signer.getAddress()
}

async function getBalanceOf() {
  const account = await getAccount()
  const tokenAddress = document.getElementById('tokenAddressBalance').value
  const tokenContract = new ethers.Contract(tokenAddress, erc20ABI, provider)

  try {
    const balance = await tokenContract.balanceOf(account)
    document.getElementById(
      'balanceResult'
    ).textContent = `Balance: ${ethers.utils.formatUnits(balance, 18)}`
    document.getElementById('tokenAddressBalance').value = ''
  } catch (error) {
    console.error(error)
    alert('Error fetching balance.')
  }
}


async function getAllowance() {
  const account = await getAccount()
  const tokenAddress = document.getElementById('tokenAddressAllowance').value
  const tokenContract = new ethers.Contract(tokenAddress, erc20ABI, provider)

  try {
    const allowance = await tokenContract.allowance(account, contractAddress)
    document.getElementById(
      'allowanceResult'
    ).textContent = `Allowance: ${ethers.utils.formatUnits(allowance, 18)}`
    document.getElementById('tokenAddressAllowance').value = ''
  } catch (error) {
    console.error(error)
    alert('Error fetching allowance.')
  }
}

async function approveToken() {
  const tokenAddress = document.getElementById('tokenAddressApprove').value
  const approveAmount = document.getElementById('approveAmount').value
  const tokenContract = new ethers.Contract(tokenAddress, erc20ABI, signer)

  try {
    const tx = await tokenContract.approve(
      contractAddress,
      ethers.utils.parseUnits(approveAmount, 18)
    )
    await tx.wait()
    document.getElementById('approveResult').textContent =
      'Tokens approved successfully!'

    document.getElementById('tokenAddressApprove').value = ''
    document.getElementById('approveAmount').value = ''
  } catch (error) {
    console.error(error)
    alert('Error approving tokens.')
  }
}

async function addLiquidity() {
  const amountA = document.getElementById('addAmountA').value
  const amountB = document.getElementById('addAmountB').value

  try {
    const tx = await dexContract.addLiquidity(
      ethers.utils.parseUnits(amountA, 18),
      ethers.utils.parseUnits(amountB, 18)
    )
    await tx.wait()
    alert('Liquidity added successfully!')
    document.getElementById('addAmountA').value = ''
    document.getElementById('addAmountB').value = ''
  } catch (error) {
    console.error(error)
    alert('Error adding liquidity.')
  }
}

async function removeLiquidity() {
  const amountA = document.getElementById('removeAmountA').value
  const amountB = document.getElementById('removeAmountB').value

  try {
    const tx = await dexContract.removeLiquidity(
      ethers.utils.parseUnits(amountA, 18),
      ethers.utils.parseUnits(amountB, 18)
    )
    await tx.wait()
    alert('Liquidity removed successfully!')
    document.getElementById('removeAmountA').value = ''
    document.getElementById('removeAmountB').value = ''
  } catch (error) {
    console.error(error)
    alert('Error removing liquidity.')
  }
}

async function swapAforB() {
  const amountA = document.getElementById('swapAmountA').value

  try {
    const tx = await dexContract.swapAforB(ethers.utils.parseUnits(amountA, 18))
    await tx.wait()
    alert('Swap A for B successful!')
    document.getElementById('swapAmountA').value = ''
  } catch (error) {
    console.error(error)
    alert('Error swapping tokens.')
  }
}

async function swapBforA() {
  const amountB = document.getElementById('swapAmountB').value

  try {
    const tx = await dexContract.swapBforA(ethers.utils.parseUnits(amountB, 18))
    await tx.wait()
    alert('Swap B for A successful!')
    document.getElementById('swapAmountB').value = ''
  } catch (error) {
    console.error(error)
    alert('Error swapping tokens.')
  }
}

async function getPrice() {
  const token = document.getElementById('priceToken').value

  try {
    const price = await dexContract.getPrice(token)
    document.getElementById('priceResult').textContent = `Price: ${ethers.utils.formatUnits(price, 18)}`
    document.getElementById('priceToken').value = ''
  } catch (error) {
    console.error(error)
    alert('Error fetching price.', error)
  }
}

/* async function getMetaMaskAccount() {
  try {
    const accounts = await ethereum.request({ method: 'eth_accounts' })

    if (accounts.length > 0) {
      walletAddressInput.value = 'Address acount: ' + accounts[0]
    } else {
      walletAddressInput.value = ''
    }
  } catch (error) {
    console.error(error)
    walletAddressInput.value = 'Error'
  }
}

getMetaMaskAccount() */
connectWallet()
connectEthers()
