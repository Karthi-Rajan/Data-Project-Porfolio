import React, { useRef, useEffect } from "react";
import gsap from "gsap";

const BackgroundLight = ({
  initialX = 1.4,
  color = { r: 1.0, g: 0.8, b: 0.4 },
  glowRadiusX = 0.35, // Horizontal glow radius
  glowRadiusY = 0.2, // Vertical glow radius (smaller for elliptical shape)
  intensity = 2.0,
  opacity = 0,
  wiggleAmount = 70,
  verticalWiggleAmount = 30,
  fadeDuration = 3,
  wiggleSpeed = 5,
  lightDirection = 1.1,
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl");

    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Vertex Shader
    const vertexShaderSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    // Fragment Shader - Elliptical Light with Soft Diffusion
    const fragmentShaderSource = `
      precision mediump float;
      uniform vec2 u_resolution;
      uniform vec2 u_lightPos;
      uniform float u_glowRadiusX;
      uniform float u_glowRadiusY;
      uniform float u_intensity;
      uniform float u_opacity;
      
      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution;
        vec2 lightDir = (gl_FragCoord.xy - u_lightPos) / vec2(u_glowRadiusX, u_glowRadiusY); // Normalize ellipse shape
        float dist = length(lightDir); 

        // Soft Glow Effect
        float glow = smoothstep(0.9, 0.2, dist);
        glow *= exp(-dist) * u_intensity;

        // Elliptical Glow Spread
        float spread = exp(-pow(dist, 2.0));
        float finalGlow = mix(spread, glow, 0.7); 

        // Apply Color and Opacity
        vec3 color = vec3(${color.r}, ${color.g}, ${color.b}) * finalGlow;
        gl_FragColor = vec4(color, finalGlow * u_opacity);
      }
    `;

    // Compile Shaders
    const compileShader = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource);

    // Create Shader Program
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Fullscreen Quad
    const vertices = new Float32Array([
      -1, -1,   1, -1,   -1, 1,
      -1, 1,    1, -1,    1, 1,
    ]);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const position = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    // Get Uniform Locations
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const lightPosLocation = gl.getUniformLocation(program, "u_lightPos");
    const glowRadiusXLocation = gl.getUniformLocation(program, "u_glowRadiusX");
    const glowRadiusYLocation = gl.getUniformLocation(program, "u_glowRadiusY");
    const intensityLocation = gl.getUniformLocation(program, "u_intensity");
    const opacityLocation = gl.getUniformLocation(program, "u_opacity");

    // Light properties
    const lightProps = {
      x: window.innerWidth * initialX,
      y: window.innerHeight *0.55,
      radiusX: window.innerWidth * glowRadiusX,
      radiusY: window.innerHeight * glowRadiusY,
      intensity: intensity,
      opacity: opacity,
    };

    // GSAP Animation
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(lightProps, {
      x: window.innerWidth * lightDirection,
      duration: 4.5,
      ease: "power2.out",
    });

    tl.to(lightProps, {
      opacity: 1,
      duration: fadeDuration,
      ease: "power2.out",
    });

    // Render Loop
    const render = () => {
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform2f(lightPosLocation, lightProps.x, lightProps.y);
      gl.uniform1f(glowRadiusXLocation, lightProps.radiusX);
      gl.uniform1f(glowRadiusYLocation, lightProps.radiusY);
      gl.uniform1f(intensityLocation, lightProps.intensity);
      gl.uniform1f(opacityLocation, lightProps.opacity);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      requestAnimationFrame(render);
    };

    setTimeout(() => {
      render();
    }, 500);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      gl.deleteProgram(program);
    };
  }, [
    initialX,
    color,
    glowRadiusX,
    glowRadiusY,
    intensity,
    opacity,
    wiggleAmount,
    verticalWiggleAmount,
    fadeDuration,
    wiggleSpeed,
    lightDirection,
  ]);

  return <canvas ref={canvasRef} className="shader-background"></canvas>;
};

export default BackgroundLight;
