import * as React from "react";
import { Flex, Link, FlexProps } from "@chakra-ui/react";
import { AiFillInstagram } from "react-icons/ai";
import { AiFillFacebook } from "react-icons/ai";
import { CgTwitter } from "react-icons/cg";
type TSocialNetwork = ({
  displayIcons,
  displayNames,
  ...props
}: FlexProps & {
  displayIcons?: boolean;
  displayNames?: boolean;
}) => JSX.Element;
export const SocialNetworks: TSocialNetwork = ({
  displayIcons = true,
  displayNames = false,
  ...props
}) => {
  const networks = {
    facebook: AiFillFacebook,
    instagram: AiFillInstagram,
    twitter: CgTwitter,
  };
  return (
    <Flex {...props}>
      {Object.entries(networks).map(([name, NetworkIcon], index) => (
        <Link
          textTransform="capitalize"
          isExternal
          key={`socialMediaUrl#${index}`}
          href={`https:www.${name}.com`}
        >
          {displayIcons && (
            <NetworkIcon color="inherit" style={{ display: "inline" }} />
          )}
          {displayNames && name}
        </Link>
      ))}
    </Flex>
  );
};
