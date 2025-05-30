export const getSimilarProducts = async (title: string, length: number) => {
  const response = await fetch(
    `http://127.0.0.1:8000/getRecomendationUsingTitle?title=${title}&length=${length}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.msg);
  }
  return data;
};
