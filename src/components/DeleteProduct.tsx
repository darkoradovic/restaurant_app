"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { toast } from "react-toastify";

const DeleteButton = ({ id }: { id: string }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <p className=" self-baseline">Loading...</p>;
  }

  if (status === "unauthenticated" || !session?.user.isAdmin) {
    return;
  }

  const handleDelete = async () => {
    const res = await fetch(`http://localhost:3000/api/products/${id}`, {
      method: "DELETE",
    });

    if (res.status === 200) {
      router.push("/menu");
      toast("The product has been deleted!");
    } else {
      const data = await res.json();
      toast.error(data.message);
    }
  };

  return (
    <button
      className="bg-red-400 hover:bg-red-500 text-white p-2 rounded-full ml-6  self-baseline"
      onClick={handleDelete}
    >
      <Image src="/delete.png" alt="" width={40} height={40} />
    </button>
  );
};

export default DeleteButton;
