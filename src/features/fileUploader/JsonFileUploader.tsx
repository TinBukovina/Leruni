import { useEffect, useState } from "react";
import FileUploader from "./FildeUploader";
import { Box, Flex } from "../../../styled-system/jsx";
import { useQuizDataContext } from "../quizzing/QuizDataContext";

const JsonFileUploader = () => {
  const [files, setFiles] = useState<File[]>([]);

  const { questionFileObject, setQuestionFileObject } = useQuizDataContext();

  const handleFilesUploaded = (newFiles: File[]) => {
    const uniqueFiles = newFiles.filter(
      (newFile) =>
        !files.some((existingFile) => existingFile.name === newFile.name)
    );

    setFiles((prevFiles) => [...prevFiles, ...uniqueFiles]);
  };

  useEffect(() => {
    console.log("Processing files:", files);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target?.result as string);
          console.log(`Parsed data from ${file.name}:`, jsonData);

          setQuestionFileObject({
            fileName: file.name,
            question_object: jsonData,
          });
        } catch (error) {
          console.error(`Error parsing ${file.name}:`, error);
        }
      };
      reader.readAsText(file);
    });
  }, [files, setQuestionFileObject]);

  return (
    <Flex
      flexDirection={"column"}
      gap={"lg"}
      mx={"auto"}
      p={"2xl"}
      w={"360px"}
      maxW={"400px"}
      height={"386px"}
      bg={"surface.s1"}
      borderRadius={"md"}
    >
      <FileUploader
        onFilesUploaded={handleFilesUploaded}
        maxFiles={10}
        maxSizeMB={5}
      />

      <Box fontSize={"h5"}>
        {questionFileObject?.fileName || "No files added"}
      </Box>
      <Flex flexDirection={"column"} gap={"sm"}>
        <Box>Supports: json</Box>
        {!questionFileObject?.fileName ? (
          <Box color={"text.secondary"}>Add files to start learning</Box>
        ) : (
          <Box color={"transparent"}>.</Box>
        )}
      </Flex>
    </Flex>
  );
};

export default JsonFileUploader;
