import { apolloServerClient } from "@/graphql/apollo-server-client";
import { gql } from "@apollo/client";
import { NextRequest, NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function POST(req: NextRequest) {
  const { query, variables } = await req.json();

  try {
    let result;

    if (query.trim().startsWith("mutation")) {
      result = await apolloServerClient.mutate({
        mutation: gql`
          ${query}
        `,
        variables,
      });
    }

    if (query.trim().startsWith("query")) {
      result = await apolloServerClient.query({
        query: gql`
          ${query}
        `,
        variables,
      });
    }

    console.log("result: ", result);

    const data = result?.data;

    return NextResponse.json(
      { data },
      {
        headers: { ...corsHeaders },
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }
}
