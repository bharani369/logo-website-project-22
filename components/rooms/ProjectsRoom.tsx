"use client"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Text, Box, Image } from "@react-three/drei"
import type * as THREE from "three"

interface ProjectsRoomProps {
  position: [number, number, number]
}

export function ProjectsRoom({ position }: ProjectsRoomProps) {
  const groupRef = useRef<THREE.Group>(null)

  const projects = [
    {
      title: "Text to Speech App",
      description: "Convert text to natural speech with 3D interface",
      tech: "JavaScript, Web Speech API, CSS3",
      image: "/images/projects/text-to-speech.jpeg",
      github: "#",
      demo: "#",
    },
    {
      title: "Notes Taking App",
      description: "Digital notepad with rich text editing features",
      tech: "React JS, Local Storage, CSS",
      image: "/images/projects/notes-taking.jpeg",
      github: "#",
      demo: "#",
    },
    {
      title: "Character Counter",
      description: "Real-time input character counting utility",
      tech: "JavaScript, HTML, CSS",
      image: "/images/projects/character-counter.jpeg",
      github: "#",
      demo: "#",
    },
    {
      title: "Age Calculator",
      description: "Calculate age with precision and visual feedback",
      tech: "JavaScript, Date API, CSS3",
      image: "/images/projects/age-calculator.jpeg",
      github: "#",
      demo: "#",
    },
  ]

  return (
    <group ref={groupRef} position={position}>
      {/* Room walls */}
      <Box args={[18, 4, 22]} position={[0, 2, 0]}>
        <meshStandardMaterial color="#ecf0f1" transparent opacity={0.1} />
      </Box>

      {/* Room title */}
      <Text position={[0, 4, -10]} fontSize={1} color="#2c3e50" anchorX="center" anchorY="middle">
        My Projects
      </Text>

      {/* Project gallery - simplified to 4 projects */}
      <ProjectGallery projects={projects} />

      {/* Interactive computer setup */}
      <ComputerSetup position={[0, 0, 5]} />
    </group>
  )
}

function ProjectGallery({ projects }: { projects: any[] }) {
  return (
    <group>
      {/* Single row of projects */}
      {projects.map((project, index) => (
        <ProjectDisplay key={index} project={project} position={[-6 + index * 4, 2, -8]} />
      ))}
    </group>
  )
}

interface ProjectDisplayProps {
  project: {
    title: string
    description: string
    tech: string
    image: string
    github: string
    demo: string
  }
  position: [number, number, number]
}

function ProjectDisplay({ project, position }: ProjectDisplayProps) {
  const [hovered, setHovered] = useState(false)
  const projectRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (projectRef.current) {
      projectRef.current.rotation.y = hovered ? 0.1 : 0
    }
  })

  return (
    <group
      ref={projectRef}
      position={position}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* Project frame */}
      <Box args={[3, 2, 0.1]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#2c3e50" />
      </Box>

      {/* Project image */}
      <Image url={project.image} position={[0, 0.2, 0.06]} scale={[2.8, 1.5, 1]} transparent />

      {/* Project title */}
      <Text
        position={[0, -0.7, 0.06]}
        fontSize={0.2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={2.8}
        textAlign="center"
      >
        {project.title}
      </Text>

      {/* Simplified hover info */}
      {hovered && (
        <Text
          position={[0, -1.2, 0.06]}
          fontSize={0.15}
          color="#3498db"
          anchorX="center"
          anchorY="middle"
          maxWidth={2.8}
          textAlign="center"
        >
          {project.tech}
        </Text>
      )}
    </group>
  )
}

function ComputerSetup({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Desk */}
      <Box args={[6, 0.2, 3]} position={[0, 0.8, 0]}>
        <meshStandardMaterial color="#8b4513" />
      </Box>

      {/* Monitor */}
      <Box args={[2.5, 1.5, 0.1]} position={[0, 1.8, -1]}>
        <meshStandardMaterial color="#2c3e50" />
      </Box>

      {/* Keyboard */}
      <Box args={[1.5, 0.1, 0.5]} position={[0, 0.9, 0.5]}>
        <meshStandardMaterial color="#34495e" />
      </Box>
    </group>
  )
}
