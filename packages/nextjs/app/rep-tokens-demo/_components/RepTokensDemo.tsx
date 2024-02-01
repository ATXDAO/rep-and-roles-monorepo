"use client";

import { tokenCardConfigProps as singleCardConfig } from "./configs/SingleCardConfig";
import { balanceConfigProps } from "./configs/values/BalanceCardConfig";
import { descriptionConfigProps } from "./configs/values/DescriptionCardConfig";
import { imageConfigProps } from "./configs/values/ImageCardConfig";
import { isTradeableConfigProps } from "./configs/values/IsTradeableCardConfig";
import { maxMintAmountConfigProps } from "./configs/values/MaxMintAmountCardConfig";
import { nameConfigProps } from "./configs/values/NameCardConfig";
import { useAccount } from "wagmi";
import { tokenGroupCardConfigProps as mainTokenGroupCardConfigProps } from "~~/app/rep-tokens-demo/_components/configs/MainTokensCardConfig";
import { tokenGroupCardConfigProps as mainTokenGroupOverlayCardConfigProps } from "~~/app/rep-tokens-demo/_components/configs/MainTokensCardWithNumberOverlayConfig";
import { tokenGroupCardConfigProps as navBarTokenGroupConfigProps } from "~~/app/rep-tokens-demo/_components/configs/NavBarCardConfig";
import { TokenCard } from "~~/components/rep-tokens/cards/token-card/TokenCard";
import { TokenGroupCard } from "~~/components/rep-tokens/cards/token-group-card/TokenGroupCard";
import { BalanceCard } from "~~/components/rep-tokens/cards/value-cards/BalanceCard";
import { ImageCard } from "~~/components/rep-tokens/cards/value-cards/ImageCard";
import { StringCard } from "~~/components/rep-tokens/cards/value-cards/StringCard";
import { useRepTokens } from "~~/components/rep-tokens/hooks/Hooks";
import {
  buildBalanceCard,
  buildImageCard,
  buildStringCard,
  buildTokenCard,
  buildTokenCards,
  buildTokenGroupCard,
} from "~~/components/rep-tokens/utils/buildTokensCard";
import { Address } from "~~/components/scaffold-eth";

export function RepTokensDemo() {
  //Data Gathering
  const { address } = useAccount();
  const { tokensData } = useRepTokens(address);

  for (let i = 0; i < tokensData.tokens.length; i++) {
    tokensData.tokens[i].image = tokensData.tokens[i].image?.replace("ipfs://", "https://ipfs.io/ipfs/");
  }

  //Card Creation

  const balanceProps = buildBalanceCard(tokensData?.tokens[0]?.balance, balanceConfigProps);
  const nameProps = buildStringCard(tokensData?.tokens[0]?.name, nameConfigProps);
  const descriptionsProps = buildStringCard(tokensData?.tokens[0]?.description, descriptionConfigProps);
  const imageProps = buildImageCard(tokensData?.tokens[0]?.image, imageConfigProps);
  const isTradeableProps = buildStringCard(
    tokensData?.tokens[0]?.properties?.isTradeable !== undefined
      ? `Is Tradeable: ${tokensData?.tokens[0]?.properties.isTradeable}`
      : undefined,
    isTradeableConfigProps,
  );
  const maxMintAmountProps = buildStringCard(
    tokensData?.tokens[0]?.properties?.maxMintAmountPerTx !== undefined
      ? `Max Mint Amount Per Tx: ${tokensData?.tokens[0]?.properties.maxMintAmountPerTx}`
      : undefined,
    maxMintAmountConfigProps,
  );

  const singleCard = buildTokenCard(tokensData?.tokens[0], tokensData.address, singleCardConfig);

  const mainTokenCards = buildTokenCards(
    tokensData.tokens,
    tokensData.address,
    mainTokenGroupCardConfigProps.tokenCardConfigProps,
  );
  const mainTokenGroupCardProps = buildTokenGroupCard(
    mainTokenGroupCardConfigProps,
    mainTokenCards,
    tokensData.address,
  );

  if (mainTokenGroupCardConfigProps.address?.isRendering) {
    mainTokenGroupCardProps.addressOutput = <Address props={mainTokenGroupCardProps.addressProps} />;
  }

  const mainTokensOverlayCards = buildTokenCards(
    tokensData.tokens,
    tokensData.address,
    mainTokenGroupOverlayCardConfigProps.tokenCardConfigProps,
  );
  const mainTokenGroupOverlayCardProps = buildTokenGroupCard(
    mainTokenGroupOverlayCardConfigProps,
    mainTokensOverlayCards,
    tokensData.address,
  );

  if (mainTokenGroupOverlayCardConfigProps.address?.isRendering) {
    mainTokenGroupOverlayCardProps.addressOutput = <Address props={mainTokenGroupOverlayCardProps.addressProps} />;
  }

  const navBarTokenCards = buildTokenCards(
    tokensData.tokens,
    tokensData.address,
    navBarTokenGroupConfigProps.tokenCardConfigProps,
  );
  const navBarTokenGroupCardProps = buildTokenGroupCard(
    navBarTokenGroupConfigProps,
    navBarTokenCards,
    tokensData.address,
  );

  if (navBarTokenGroupConfigProps.address?.isRendering) {
    navBarTokenGroupCardProps.addressOutput = <Address props={navBarTokenGroupCardProps.addressProps} />;
  }

  return (
    <>
      <div className="space-y-5 flex flex-col justify-center items-center bg-primary bg-[length:100%_100%] py-1 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
        <BalanceCard props={balanceProps} />
        <StringCard props={nameProps} />
        <ImageCard props={imageProps} />
        <StringCard props={descriptionsProps} />
        <StringCard props={isTradeableProps} />
        <StringCard props={maxMintAmountProps} />
        <TokenCard props={singleCard} />
        <TokenGroupCard props={mainTokenGroupCardProps} />
        <TokenGroupCard props={mainTokenGroupOverlayCardProps} />
        <TokenGroupCard props={navBarTokenGroupCardProps} />
      </div>
    </>
  );
}
