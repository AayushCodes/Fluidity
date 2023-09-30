import { ethers } from "ethers";
import { Framework } from "@superfluid-finance/sdk-core";

function calculateFlow(amountInGWeiPerMonth) {
  if (
    typeof Number(amountInGWeiPerMonth) !== "number" ||
    isNaN(Number(amountInGWeiPerMonth)) === true
  ) {
    console.log("You can only calculate a flowRate based on a number");
    return;
  } else if (typeof Number(amountInGWeiPerMonth) === "number") {
    if (Number(amountInGWeiPerMonth) === 0) {
      return 0;
    }
    const amountInWei = ethers.BigNumber.from(
      ethers.utils.parseEther(String(amountInGWeiPerMonth))
    );
    const calculatedFlowRate = amountInWei.div(3600 * 24 * 30);
    console.log(parseInt(calculatedFlowRate._hex));
    if (calculatedFlowRate != undefined) {
      return calculatedFlowRate;
    }
  }
}

export async function checkBalance(token, amount, address, signer) {
  const userBalance = await token.balanceOf({
    account: address,
    providerOrSigner: signer,
  });
  return (amount >= userBalance/1e18);
}

export async function startStream(
  initiated,
  recipient,
  amountInGWeiPerMonth,
  token
) {
  const flowRateCalc = calculateFlow(amountInGWeiPerMonth);
  console.log(flowRateCalc);
  console.log(
    `You want to start a stream to ${recipient} for ${amountInGWeiPerMonth} ${token} per month?`
  );
  const superSigner = initiated[0];
  const streamToken = initiated[1][`f${token.toLowerCase()}x`];
  console.log(token);
  console.log(streamToken);
  const signer = initiated[2];
  const address = initiated[3];
  const balance = await checkBalance(streamToken, amountInGWeiPerMonth, address, signer);
  console.log(balance)
  try {
    const res = await streamToken.getFlow({
      sender: address,
      receiver: recipient,
      providerOrSigner: signer,
    });
    console.log(res.flowRate);
    if (res.flowRate == 0) {
      const createFlowOperation = streamToken.createFlow({
        sender: await superSigner.getAddress(),
        receiver: recipient,
        flowRate: flowRateCalc,
      });
      console.log(createFlowOperation);
      console.log("Creating your stream...");

      const result = await createFlowOperation.exec(superSigner);
      console.log(result);

      console.log(
        `Congrats - you've just created a money stream!
    `
      );
    } else {
      const updateFlowOperation = streamToken.updateFlow({
        sender: await superSigner.getAddress(),
        receiver: recipient,
        flowRate: flowRateCalc,
      });
      console.log(updateFlowOperation);
      console.log("Updating your stream...");

      const result = await updateFlowOperation.exec(superSigner);
      console.log(result);

      console.log(
        `Congrats - you've just updated your money stream!
    `
      );
    }
  } catch (error) {
    console.log(
      "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
    );
    console.error(error);
  }
}

export async function deleteStream(initiated, address, token) {
  console.log(
    `You want to delete a stream to ${address} for ${amountInGWeiPerMonth} ${token} per month?`
  );
  const superSigner = initiated[0];
  const streamToken = initiated[1][`f${token.toLowerCase()}x`];
  try {
    const deleteFlowOperation = streamToken.deleteFlow({
      sender: await superSigner.getAddress(),
      receiver: recipient,
    });

    console.log(deleteFlowOperation);
    console.log("Deleting your stream...");

    const result = await deleteFlowOperation.exec(superSigner);
    console.log(result);
    console.log("Congrats! You just deleted a money stream");
  } catch (e) {
    console.log(e);
  }
}

export async function updateStream(
  initiated,
  address,
  amountInGWeiPerMonth,
  token
) {
  console.log(
    `You want to update your stream to ${address} for ${amountInGWeiPerMonth} ${token} per month?`
  );
}

export async function init() {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    console.log(chainId);
    const sf = await Framework.create({
      chainId: Number(chainId),
      provider: provider,
    });
    const superSigner = sf.createSigner({ signer: signer });
    console.log(await superSigner.getAddress());
    const fDAIx = await sf.loadSuperToken("fDAIx");
    console.log(fDAIx);
    const fTUSDx = await sf.loadSuperToken("fTUSDx");
    const fUSDCx = await sf.loadSuperToken("fUSDCx");
    const tokens = { fdaix: fDAIx, ftusdx: fTUSDx, fusdcx: fUSDCx };
    return [superSigner, tokens, signer, address, provider];
  } catch (e) {
    console.log(e);
  }
}