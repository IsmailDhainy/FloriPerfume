import { restApiClient } from "../restApiClient";

export type FileMediaPath = {
  path: string;
  url: string;
};

export const getMultiUploadUrls = async (files: File[], path: string) => {
  const extensions = files.map((file) => file.name);

  const res = await restApiClient.post<
    { data: FileMediaPath[] },
    { extensions: (string | undefined)[]; path: string }
  >(`media/get-multi-upload-urls`, {
    data: {
      extensions,
      path,
    },
  });
  return res;
};
