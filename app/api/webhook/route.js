import { Webhook } from "svix";
import { clerkClient } from "@clerk/nextjs";
import {WebHookEvent} from "@clerk/nextjs/server"
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { createUser } from "@/utils/actions/user.create";

export async function POST(request) {


}