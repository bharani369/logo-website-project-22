"use client"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Text, Box, Image, Sphere, Plane } from "@react-three/drei"
import type * as THREE from "three"

interface AboutRoomProps {
  position: [number, number, number]
}

export function AboutRoom({ position }: AboutRoomProps) {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Room walls */}
      <Box args={[18, 4, 22]} position={[0, 2, 0]}>
        <meshStandardMaterial color="#f8f9fa" transparent opacity={0.1} />
      </Box>

      {/* Profile picture on back wall */}
      <Image url="/images/profile.png" position={[0, 3, -10]} scale={[4, 4, 1]} transparent />

      {/* Main title */}
      <Text position={[0, 4.5, -9.8]} fontSize={0.6} color="#2c3e50" anchorX="center" anchorY="middle">
        Hi, I'm Bharanidharan P
      </Text>

      {/* Subtitle */}
      <Text
        position={[0, 1.8, -9.8]}
        fontSize={0.35}
        color="#000000"
        anchorX="center"
        anchorY="middle"
        maxWidth={12}
        textAlign="center"
        font="/fonts/Geist-Bold.ttf"
      >
        Aspiring Full Stack Developer
      </Text>

      {/* About description */}
      <Text
        position={[0, 1, -9.8]}
        fontSize={0.25}
        color="#34495e"
        anchorX="center"
        anchorY="middle"
        maxWidth={14}
        textAlign="center"
      >
        I'm passionate about building innovative solutions and currently focusing on developing my skills as a Full
        Stack Developer.
      </Text>

      {/* Objective section */}
      <ObjectiveSection position={[-7, 2.5, 0]} />

      {/* Technical Skills section */}
      <TechnicalSkillsSection position={[7, 2.5, 0]} />

      {/* Soft Skills section */}
      <SoftSkillsSection position={[0, 0.5, 8]} />

      {/* 3D Laptop Setup */}
      <LaptopSetup position={[0, 0.5, 2]} />

      {/* Tech stack display on side wall */}
      <Image url="/images/tech-stack.png" position={[8.5, 2.5, -5]} scale={[3, 3, 1]} transparent />

      {/* Interactive elements */}
      <Sphere
        args={[0.4]}
        position={[-6, 1.5, 0]}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <meshStandardMaterial color={hovered ? "#3498db" : "#e74c3c"} emissive={hovered ? "#1a5490" : "#000000"} />
      </Sphere>

      {/* Floating particles */}
      <FloatingParticles />
    </group>
  )
}

function ObjectiveSection({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Background panel */}
      <Plane args={[6, 4]} position={[0, 0, -0.1]}>
        <meshStandardMaterial color="#3498db" emissive="#1a5490" emissiveIntensity={0.1} transparent opacity={0.8} />
      </Plane>

      <Text position={[0, 1.5, 0]} fontSize={0.4} color="#ffffff" anchorX="center" anchorY="middle">
        Objective
      </Text>

      <Text
        position={[0, 0, 0]}
        fontSize={0.2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={5.5}
        textAlign="center"
      >
        To secure a challenging and rewarding role as a Full Stack Developer in a reputable organization, where I can
        apply my skills and knowledge to contribute to the growth and success of the company.
      </Text>
    </group>
  )
}

function TechnicalSkillsSection({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Background panel */}
      <Plane args={[6, 4]} position={[0, 0, -0.1]}>
        <meshStandardMaterial color="#e74c3c" emissive="#8b0000" emissiveIntensity={0.1} transparent opacity={0.8} />
      </Plane>

      <Text position={[0, 1.5, 0]} fontSize={0.4} color="#ffffff" anchorX="center" anchorY="middle">
        Technical Skills
      </Text>

      <Text
        position={[0, 0.8, 0]}
        fontSize={0.18}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={5.5}
        textAlign="center"
      >
        Programming Languages: Python, JavaScript
      </Text>

      <Text
        position={[0, 0.3, 0]}
        fontSize={0.18}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={5.5}
        textAlign="center"
      >
        Frontend: HTML, CSS, JavaScript, React JS
      </Text>

      <Text
        position={[0, -0.2, 0]}
        fontSize={0.18}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={5.5}
        textAlign="center"
      >
        Backend: Node.js, Express.js
      </Text>

      <Text
        position={[0, -0.7, 0]}
        fontSize={0.18}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={5.5}
        textAlign="center"
      >
        Database: MongoDB
      </Text>
    </group>
  )
}

function SoftSkillsSection({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Background panel */}
      <Plane args={[12, 2]} position={[0, 0, -0.1]}>
        <meshStandardMaterial color="#2ecc71" emissive="#006400" emissiveIntensity={0.1} transparent opacity={0.8} />
      </Plane>

      <Text position={[0, 0.6, 0]} fontSize={0.35} color="#ffffff" anchorX="center" anchorY="middle">
        Soft Skills
      </Text>

      <Text
        position={[0, -0.2, 0]}
        fontSize={0.2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={11}
        textAlign="center"
      >
        Strong problem-solving skills • Effective communication and teamwork • Adaptability and willingness to learn •
        Time management and organization
      </Text>
    </group>
  )
}

function FloatingParticles() {
  const particlesRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.children.forEach((particle, i) => {
        particle.position.y += Math.sin(state.clock.elapsedTime + i) * 0.01
        particle.rotation.z += 0.01
      })
    }
  })

  return (
    <group ref={particlesRef}>
      {Array.from({ length: 15 }).map((_, i) => (
        <Box
          key={i}
          args={[0.1, 0.1, 0.1]}
          position={[(Math.random() - 0.5) * 16, Math.random() * 4, (Math.random() - 0.5) * 20]}
        >
          <meshStandardMaterial color="#3498db" transparent opacity={0.6} />
        </Box>
      ))}
    </group>
  )
}

function LaptopSetup({ position }: { position: [number, number, number] }) {
  const laptopRef = useRef<THREE.Group>(null)
  const mouseRef = useRef<THREE.Group>(null)
  const keyboardRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (laptopRef.current) {
      laptopRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
    if (mouseRef.current) {
      mouseRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.05
    }
    if (keyboardRef.current) {
      keyboardRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5 + 1) * 0.03
    }
  })

  return (
    <group position={position}>
      {/* Desk surface */}
      <Box args={[8, 0.2, 4]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#8b4513" roughness={0.3} metalness={0.1} />
      </Box>

      {/* Laptop */}
      <group ref={laptopRef} position={[0, 0.5, -0.5]}>
        {/* Laptop base */}
        <Box args={[3, 0.15, 2]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#2c3e50" roughness={0.2} metalness={0.8} />
        </Box>

        {/* Laptop screen */}
        <Box args={[3, 2, 0.1]} position={[0, 1.2, -0.9]} rotation={[-0.2, 0, 0]}>
          <meshStandardMaterial color="#1a1a1a" roughness={0.1} metalness={0.9} />
        </Box>

        {/* Screen display */}
        <Box args={[2.8, 1.8, 0.05]} position={[0, 1.2, -0.85]} rotation={[-0.2, 0, 0]}>
          <meshStandardMaterial color="#000000" emissive="#003366" emissiveIntensity={0.3} />
        </Box>

        {/* Code on screen */}
        <Text
          position={[0, 1.2, -0.8]}
          rotation={[-0.2, 0, 0]}
          fontSize={0.1}
          color="#00ff00"
          anchorX="center"
          anchorY="middle"
          maxWidth={2.5}
          textAlign="left"
        >
          {`function developer() {
  return "Full Stack";
}`}
        </Text>
      </group>

      {/* Wireless Mouse */}
      <group ref={mouseRef} position={[2, 0.25, 0.5]}>
        {/* Mouse body */}
        <Box args={[0.8, 0.3, 1.2]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#34495e" roughness={0.2} metalness={0.7} />
        </Box>

        {/* Mouse scroll wheel */}
        <Box args={[0.1, 0.35, 0.2]} position={[0, 0.05, -0.2]}>
          <meshStandardMaterial color="#2c3e50" roughness={0.3} metalness={0.8} />
        </Box>

        {/* Mouse buttons */}
        <Box args={[0.35, 0.32, 0.5]} position={[-0.2, 0.02, -0.3]}>
          <meshStandardMaterial color="#2c3e50" roughness={0.2} metalness={0.8} />
        </Box>
        <Box args={[0.35, 0.32, 0.5]} position={[0.2, 0.02, -0.3]}>
          <meshStandardMaterial color="#2c3e50" roughness={0.2} metalness={0.8} />
        </Box>
      </group>

      {/* Mechanical Keyboard */}
      <group ref={keyboardRef} position={[-1.5, 0.15, 1]}>
        {/* Keyboard base */}
        <Box args={[4, 0.3, 1.5]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#2c3e50" roughness={0.3} metalness={0.6} />
        </Box>

        {/* Keyboard keys */}
        {Array.from({ length: 15 }).map((_, row) =>
          Array.from({ length: 4 }).map((_, col) => (
            <Box key={`${row}-${col}`} args={[0.2, 0.15, 0.2]} position={[-1.8 + row * 0.25, 0.22, -0.5 + col * 0.25]}>
              <meshStandardMaterial
                color={Math.random() > 0.9 ? "#3498db" : "#ecf0f1"}
                roughness={0.1}
                metalness={0.2}
              />
            </Box>
          )),
        )}

        {/* Spacebar */}
        <Box args={[2, 0.15, 0.2]} position={[0, 0.22, 0.3]}>
          <meshStandardMaterial color="#ecf0f1" roughness={0.1} metalness={0.2} />
        </Box>
      </group>

      {/* Desk accessories */}
      <DeskAccessories position={[0, 0.1, 0]} />
    </group>
  )
}

function DeskAccessories({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Coffee mug */}
      <group position={[3, 0.4, -1]}>
        <Box args={[0.4, 0.6, 0.4]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#8b4513" roughness={0.8} />
        </Box>
        {/* Coffee */}
        <Box args={[0.35, 0.1, 0.35]} position={[0, 0.25, 0]}>
          <meshStandardMaterial color="#3e2723" emissive="#2e1a17" emissiveIntensity={0.2} />
        </Box>
        {/* Handle */}
        <Box args={[0.1, 0.3, 0.1]} position={[0.25, 0, 0]}>
          <meshStandardMaterial color="#8b4513" roughness={0.8} />
        </Box>
      </group>

      {/* Notebook */}
      <group position={[-3, 0.15, 0]} rotation={[0, 0.3, 0]}>
        <Box args={[1.5, 0.05, 2]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#e74c3c" roughness={0.6} />
        </Box>
        {/* Pen */}
        <Box args={[0.05, 0.05, 1]} position={[0.5, 0.05, 0]} rotation={[0, 0.5, 0]}>
          <meshStandardMaterial color="#3498db" roughness={0.2} metalness={0.8} />
        </Box>
      </group>

      {/* Phone */}
      <group position={[2.5, 0.15, 1.5]} rotation={[0, -0.2, 0]}>
        <Box args={[0.4, 0.05, 0.8]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#1a1a1a" roughness={0.1} metalness={0.9} />
        </Box>
        {/* Screen */}
        <Box args={[0.35, 0.06, 0.7]} position={[0, 0.005, 0]}>
          <meshStandardMaterial color="#000000" emissive="#001122" emissiveIntensity={0.3} />
        </Box>
      </group>
    </group>
  )
}
