import { Platform, Text } from "react-native";
import React, { useRef, useEffect } from "react";

const SignatureWeb = () => {

  const isWeb = Platform.OS === 'web';
  const isMobile = Platform.OS === 'ios' || Platform.OS === 'android';

  if (isMobile) return (
    <>
      <Text>You are running on Mobile</Text>
    </>
  )

  const canvasRef = useRef(null);

  const saveImage = () => {
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "canvas.png";
    link.click();
  };

  useEffect(() => {
    const canvas = canvasRef.current;

    const context = canvas.getContext("2d");

    // Function to draw a circle where the user clicks

    const draw = event => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      context.beginPath();
      context.arc(x, y, 10, 0, 2 * Math.PI);
      context.fillStyle = "green";
      context.fill();
    };

    // Add the event listener

    canvas.addEventListener("mousedown", draw);

    // Clean up function

    return () => {
      canvas.removeEventListener("mousedown", draw);
    };
  }, []);

  if (isWeb) return (
    <div>
      <div className="container">
        <canvas ref={canvasRef} />
      </div>
      <button onClick={saveImage}>Save Image</button>
    </div>
  );

  return (<Text>This is unexpected</Text>)
}

export default SignatureWeb;