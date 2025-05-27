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
        color="#3498db"
        anchorX="center"
        anchorY="middle"
        maxWidth={12}
        textAlign="center"
      >
        Pre-final year IT student & Aspiring Full Stack Developer
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
