const getApiBaseUrl = () => {
  if (process.env.NODE_ENV === "development") {
    const localUrl = process.env.LOCAL_API_URL;
    if (!localUrl) {
      throw new Error("LOCAL_API_URL 환경변수가 설정되지 않았습니다.");
    }
    return localUrl;
  }

  const prodUrl = process.env.PRODUCTION_API_URL;
  if (!prodUrl) {
    throw new Error("PRODUCTION_API_URL 환경변수가 설정되지 않았습니다.");
  }
  return prodUrl;
};

export default getApiBaseUrl;
