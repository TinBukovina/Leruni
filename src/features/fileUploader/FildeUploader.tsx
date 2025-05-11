import { useState, useRef, DragEvent, ChangeEvent } from "react";
import { css } from "../../../styled-system/css";
import IconTemplate from "../../components/IconTemplate";
import { fileOpenSvgInfo, fileSvgInfo } from "../../utils/svgPaths";
import { Box, Flex } from "../../../styled-system/jsx";
import { useQuizDataContext } from "../quizzing/QuizDataContext";

interface FileUploaderProps {
  onFilesUploaded: (files: File[]) => void;
  maxFiles?: number;
  maxSizeMB?: number;
}

const FileUploader = ({
  onFilesUploaded,
  maxFiles = 5,
  maxSizeMB = 10,
}: FileUploaderProps) => {
  const [, setIsDragging] = useState<boolean>(false);
  const [isDragginOver, setIsDraggingOver] = useState<boolean>(false);
  const [, setDragReject] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { questionFileObject } = useQuizDataContext();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  const validateFiles = (files: File[]): File[] => {
    // Reset states
    setError(null);
    setDragReject(false);

    // Filter only JSON files
    const jsonFiles = Array.from(files).filter(
      (file) => file.type === "application/json" || file.name.endsWith(".json")
    );

    // Check if no JSON files were found
    if (jsonFiles.length === 0) {
      setError("Please upload JSON files only.");
      setDragReject(true);
      return [];
    }

    // Check number of files
    if (jsonFiles.length > maxFiles) {
      setError(`You can upload a maximum of ${maxFiles} files.`);
      setDragReject(true);
      return [];
    }

    // Check file sizes
    const oversizedFiles = jsonFiles.filter((file) => file.size > maxSizeBytes);
    if (oversizedFiles.length > 0) {
      setError(`File(s) too large. Maximum size is ${maxSizeMB}MB per file.`);
      setDragReject(true);
      return [];
    }

    return jsonFiles;
  };

  const handleOnMouseEnter = () => {};

  const handleOnMouseLeave = () => {
    setIsDraggingOver(false);
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    setIsDraggingOver(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    setIsDraggingOver(true);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    setIsDraggingOver(false);

    const files = e.dataTransfer.files;
    const validFiles = validateFiles(Array.from(files));

    if (validFiles.length > 0) {
      onFilesUploaded(validFiles);
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = e.target.files;
      const validFiles = validateFiles(Array.from(files));

      if (validFiles.length > 0) {
        onFilesUploaded(validFiles);
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Flex direction={"column"} w={"100%"}>
      <Box
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleButtonClick}
        className={css({
          display: "flex",
          flexDir: "column",
          alignItems: "center",
          justifyContent: "center",

          backgroundColor: isDragginOver ? "rgba(0,0,0,0.5)" : "",
          border: !questionFileObject?.fileName ? "2px dashed" : "2px solid",
          borderColor: "primaryClr",
          borderRadius: "md",

          transition: "all 0.2s",

          textAlign: "center",
          minH: "200px",
          cursor: "pointer",

          _hover: {
            bg: "gray.100",
            borderColor: "gray.400",
          },
        })}
      >
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          p={""}
          w={"60px"}
          h={"60px"}
          bg={"surface.s0"}
          borderRadius={"md"}
          fill={"text.normal"}
        >
          <IconTemplate
            width={"2rem"}
            path={isDragginOver ? fileOpenSvgInfo().path : fileSvgInfo().path}
            viewBox={
              isDragginOver ? fileOpenSvgInfo().viewBox : fileSvgInfo().viewBox
            }
          />
        </Flex>

        <input
          type="file"
          accept=".json,application/json"
          onChange={handleFileInputChange}
          ref={fileInputRef}
          className={css({ display: "none" })}
          multiple={maxFiles > 1}
        />
      </Box>

      {error && (
        <div
          className={css({
            color: "red.500",
            fontSize: "sm",
            mt: 2,
            p: 2,
            bg: "red.50",
            borderRadius: "md",
          })}
        >
          {error}
        </div>
      )}
    </Flex>
  );
};

export default FileUploader;
