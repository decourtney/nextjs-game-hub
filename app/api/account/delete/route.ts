import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { _nextAuthOptions } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Account from "@/models/Account";
import Profile from "@/models/Profile";
import mongoose from "mongoose";

export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    // const session = await getServerSession(_nextAuthOptions);
    const { email } = await req.json();
    console.log("Request data:", email);

    // if (!session || !session.user?.email) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    await dbConnect();

    const user = await User.findOne({ email: email });
    if (!user) {
      return NextResponse.json({ error: "Account not found" }, { status: 404 });
    }

    const userId = user._id;

    const deletedAccount = await Account.findOneAndDelete({ userId });
    console.log("Account deleted:", deletedAccount);

    const deletedProfile = await Profile.findOneAndDelete({ userId });
    console.log("Profile deleted:", deletedProfile);

    // Currently dont have a mongoose Session model. But there is potential for orphaned sessions.
    // const deletedSessions = await Account.deleteMany({ userId });

    const deletedUser = await User.findOneAndDelete({ _id: userId });
    console.log("User deleted:", deletedUser);

    return NextResponse.json(
      { message: "Account deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting account:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
