import { Icon, useToast } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { BsHeartFill } from "react-icons/bs";
import { AuthContext } from "../../Context/AuthProvider";
import { useNavigate } from "react-router-dom";

const WishlistButton = ({ product }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const toast = useToast();

  // getting wishlist by user email
  const { data: userWishList = [], refetch } = useQuery({
    queryKey: ["products", "wishlist"],
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          `https://furniture-shala-server.vercel.app/products/wishlist/${user?.email}`
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  // send wishlisted product
  const handleWishList = (product) => {
    // check listed product
    const listedProduct = userWishList?.find(
      (item) => item?.productId === product?._id
    );

    const wishListItem = {
      productId: product._id,
      productName: product.productName,
      userEmail: user.email,
      productImg: product?.productImg,
    };
    if (listedProduct) {
      axios
        .delete(
          `https://furniture-shala-server.vercel.app/products/wishlist/${listedProduct?._id}`
        )
        .then((res) => {
          if (res.status === 200) {
            refetch();
          }
        });
    } else {
      axios
        .post(
          `https://furniture-shala-server.vercel.app/products/wishlist`,
          wishListItem
        )
        .then((res) => {
          refetch();
          if (res.data.acknowledged) {
            toast({
              title: `Product Added on My Wishlist!`,
              position: "top",
              isClosable: true,
              status: "success",
            });
          }
        });
    }
  };
  return (
    <>
      <Icon
        as={BsHeartFill}
        fontSize={"24px"}
        pos={"absolute"}
        right={3}
        top={3}
        color={
          userWishList?.some((list) => list?.productId === product?._id) &&
          "red.500"
        }
        cursor={"pointer"}
        onClick={() => {
          user?.email ? handleWishList(product) : navigate("/login");
        }}
        zIndex={10}
      />
    </>
  );
};

export default WishlistButton;
