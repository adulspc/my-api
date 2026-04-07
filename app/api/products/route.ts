export async function GET(){
    return Response.json({
        message: "แสดง API ของสินค้า",
        data: ["สินต้า A","สินต้า B","สินต้า C"],
    });

}

export async function POST(req: Request){
    const body = await req.json();
    return Response.json({
        message: "เพิ่มสินค้าใหม่",
        data: body,
    });
}