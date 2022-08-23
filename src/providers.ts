type FileResponse = {
  content: string;
  filename: string;
};

type PasteResponse = {
  files: FileResponse[];
};

export async function Mystbin(key: string): Promise<Response> {
  const resp = await fetch(`https://api.mystb.in/paste/${key}`);
  const data: PasteResponse = await resp.json();
  const file = data.files[0];

  return new Response(
    JSON.stringify({
      content: file.content,
      language: file.filename.split(".")[1],
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
}
