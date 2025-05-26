"use client"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Text, Box, Image, Sphere, Plane } from "@react-three/drei"
import * as THREE from "three"

interface ContactRoomProps {
  position: [number, number, number]
}

export function ContactRoom({ position }: ContactRoomProps) {
  const groupRef = useRef<THREE.Group>(null)

  return (
    <group ref={groupRef} position={position}>
      {/* Room walls */}
      <Box args={[18, 4, 22]} position={[0, 2, 0]}>
        <meshStandardMaterial color="#e8f5e8" transparent opacity={0.1} />
      </Box>

      {/* Contact title */}
      <Text position={[0, 4, -10]} fontSize={1} color="#000000" anchorX="center" anchorY="middle">
        Get In Touch
      </Text>

      {/* Enhanced QR Code display with your actual QR code */}
      <EnhancedQRCodeDisplay position={[0, 2.5, -9]} />

      {/* Social Media Links */}
      <SocialMediaSection position={[-6, 2, 0]} />

      {/* Contact information */}
      <ContactInfo position={[6, 2, 0]} />

      {/* Resume download */}
      <ResumeDownload position={[0, 0.5, 5]} />

      {/* Holographic elements */}
      <HolographicElements />
    </group>
  )
}

function EnhancedQRCodeDisplay({ position }: { position: [number, number, number] }) {
  const [hovered, setHovered] = useState(false)
  const qrRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (qrRef.current) {
      // Gentle rotation
      qrRef.current.rotation.y += hovered ? 0.02 : 0.005
      // Floating animation
      qrRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1
      // Scale animation when hovered
      const targetScale = hovered ? 1.2 : 1
      qrRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    }
  })

  return (
    <group
      ref={qrRef}
      position={position}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* Enhanced QR Code frame with glow */}
      <Box args={[4, 4, 0.2]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#2c3e50"
          emissive={hovered ? "#3498db" : "#000000"}
          emissiveIntensity={hovered ? 0.3 : 0}
        />
      </Box>

      {/* Your actual QR Code image */}
      <Image url="/images/qr-code.jpeg" position={[0, 0, 0.12]} scale={[3.6, 3.6, 1]} transparent />

      {/* Glowing border effect */}
      <Plane args={[4.2, 4.2]} position={[0, 0, -0.01]}>
        <meshStandardMaterial
          color="#3498db"
          emissive="#3498db"
          emissiveIntensity={hovered ? 0.5 : 0.1}
          transparent
          opacity={0.3}
        />
      </Plane>

      {/* Enhanced description */}
      <Text position={[0, -2.5, 0]} fontSize={0.4} color="#000000" anchorX="center" anchorY="middle">
        Scan for Contact Info
      </Text>

      <Text position={[0, -3, 0]} fontSize={0.25} color="#666666" anchorX="center" anchorY="middle">
        Quick access to all my details
      </Text>

      {/* Floating particles around QR code */}
      {hovered && <QRParticles />}
    </group>
  )
}

function QRParticles() {
  const particlesRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.z = state.clock.elapsedTime * 0.5
      particlesRef.current.children.forEach((child, i) => {
        child.position.y = Math.sin(state.clock.elapsedTime * 3 + i) * 0.2
      })
    }
  })

  return (
    <group ref={particlesRef}>
      {Array.from({ length: 8 }).map((_, i) => (
        <Box
          key={i}
          args={[0.1, 0.1, 0.1]}
          position={[
            Math.cos((i / 8) * Math.PI * 2) * 3,
            Math.sin((i / 8) * Math.PI * 2) * 0.5,
            Math.sin((i / 8) * Math.PI * 2) * 3,
          ]}
        >
          <meshStandardMaterial color="#3498db" emissive="#3498db" emissiveIntensity={0.8} transparent opacity={0.7} />
        </Box>
      ))}
    </group>
  )
}

function SocialMediaSection({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Background panel */}
      <Plane args={[5, 6]} position={[0, 0, -0.1]}>
        <meshStandardMaterial color="#3498db" emissive="#1a5490" emissiveIntensity={0.1} transparent opacity={0.8} />
      </Plane>

      <Text position={[0, 2.5, 0]} fontSize={0.4} color="#ffffff" anchorX="center" anchorY="middle">
        Connect With Me
      </Text>

      {/* GitHub */}
      <SocialMediaLink position={[0, 1.5, 0]} icon="🐙" label="GitHub" username="bharani-coder" color="#333333" />

      {/* LinkedIn */}
      <SocialMediaLink
        position={[0, 0.5, 0]}
        icon="💼"
        label="LinkedIn"
        username="/in/bharanidharan-p"
        color="#0077b5"
      />

      {/* Instagram */}
      <SocialMediaLink position={[0, -0.5, 0]} icon="📷" label="Instagram" username="@bharani_coder" color="#e4405f" />

      {/* YouTube */}
      <SocialMediaLink position={[0, -1.5, 0]} icon="📺" label="YouTube" username="Bharani Coder" color="#ff0000" />
    </group>
  )
}

function SocialMediaLink({
  position,
  icon,
  label,
  username,
  color,
}: {
  position: [number, number, number]
  icon: string
  label: string
  username: string
  color: string
}) {
  const [hovered, setHovered] = useState(false)
  const linkRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (linkRef.current) {
      const targetScale = hovered ? 1.1 : 1
      linkRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    }
  })

  return (
    <group
      ref={linkRef}
      position={position}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* Icon background */}
      <Box args={[0.6, 0.6, 0.1]} position={[-1.5, 0, 0]}>
        <meshStandardMaterial color={color} emissive={hovered ? color : "#000000"} emissiveIntensity={0.3} />
      </Box>

      {/* Icon */}
      <Text position={[-1.5, 0, 0.06]} fontSize={0.3} anchorX="center" anchorY="middle">
        {icon}
      </Text>

      {/* Label and username */}
      <Text position={[-0.5, 0.1, 0]} fontSize={0.2} color="#ffffff" anchorX="left" anchorY="middle">
        {label}
      </Text>
      <Text position={[-0.5, -0.1, 0]} fontSize={0.15} color="#ffffff" anchorX="left" anchorY="middle">
        {username}
      </Text>
    </group>
  )
}

function ContactInfo({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Background panel */}
      <Plane args={[5, 6]} position={[0, 0, -0.1]}>
        <meshStandardMaterial color="#2ecc71" emissive="#006400" emissiveIntensity={0.1} transparent opacity={0.8} />
      </Plane>

      <Text position={[0, 2.5, 0]} fontSize={0.4} color="#ffffff" anchorX="center" anchorY="middle">
        Contact Information
      </Text>

      <Text position={[0, 1.5, 0]} fontSize={0.2} color="#ffffff" anchorX="center" anchorY="middle">
        📧 Email
      </Text>
      <Text position={[0, 1.2, 0]} fontSize={0.15} color="#ffffff" anchorX="center" anchorY="middle">
        bharani.coder@gmail.com
      </Text>

      <Text position={[0, 0.5, 0]} fontSize={0.2} color="#ffffff" anchorX="center" anchorY="middle">
        📱 Phone
      </Text>
      <Text position={[0, 0.2, 0]} fontSize={0.15} color="#ffffff" anchorX="center" anchorY="middle">
        +91 9876543210
      </Text>

      <Text position={[0, -0.5, 0]} fontSize={0.2} color="#ffffff" anchorX="center" anchorY="middle">
        📍 Location
      </Text>
      <Text position={[0, -0.8, 0]} fontSize={0.15} color="#ffffff" anchorX="center" anchorY="middle">
        Tamil Nadu, India
      </Text>

      <Text position={[0, -1.5, 0]} fontSize={0.2} color="#ffffff" anchorX="center" anchorY="middle">
        🎓 Education
      </Text>
      <Text position={[0, -1.8, 0]} fontSize={0.15} color="#ffffff" anchorX="center" anchorY="middle">
        Information Technology
      </Text>
    </group>
  )
}

function ResumeDownload({ position }: { position: [number, number, number] }) {
  const [hovered, setHovered] = useState(false)
  const resumeRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (resumeRef.current) {
      const targetScale = hovered ? 1.1 : 1
      resumeRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    }
  })

  return (
    <group ref={resumeRef} position={position}>
      <Text position={[0, 1, 0]} fontSize={0.4} color="#000000" anchorX="center" anchorY="middle">
        Resume
      </Text>

      <Box
        args={[4, 1.5, 0.2]}
        position={[0, 0, 0]}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <meshStandardMaterial
          color={hovered ? "#3498db" : "#34495e"}
          emissive={hovered ? "#1a5490" : "#000000"}
          emissiveIntensity={hovered ? 0.3 : 0}
        />
      </Box>

      <Text position={[0, 0, 0.15]} fontSize={0.3} color="#ffffff" anchorX="center" anchorY="middle">
        📄 Download Resume
      </Text>
    </group>
  )
}

function HolographicElements() {
  const hologramRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (hologramRef.current) {
      hologramRef.current.rotation.y = state.clock.elapsedTime * 0.5
      hologramRef.current.children.forEach((child, i) => {
        child.position.y = Math.sin(state.clock.elapsedTime * 2 + i) * 0.5 + 3
      })
    }
  })

  return (
    <group ref={hologramRef}>
      {Array.from({ length: 8 }).map((_, i) => (
        <Sphere
          key={i}
          args={[0.1]}
          position={[Math.cos((i / 8) * Math.PI * 2) * 4, 3, Math.sin((i / 8) * Math.PI * 2) * 4]}
        >
          <meshStandardMaterial color="#00ff88" emissive="#004422" transparent opacity={0.7} />
        </Sphere>
      ))}
    </group>
  )
}
