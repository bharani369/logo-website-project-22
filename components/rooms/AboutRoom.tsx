"use client"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Text, Box, Image, Sphere, Plane, Html } from "@react-three/drei"
import * as THREE from "three"

interface AboutRoomProps {
  position: [number, number, number]
}

export function AboutRoom({ position }: AboutRoomProps) {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const [showResume, setShowResume] = useState(false)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Enhanced Room walls with patterns */}
      <EnhancedWalls />

      {/* Neon LED Lighting */}
      <NeonLEDLights />

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

      {/* Resume Section with Click */}
      <ResumeSection position={[-6, 1, 6]} onClick={() => setShowResume(true)} />

      {/* 3D Laptop Setup in corner */}
      <LaptopSetup position={[7, 0.5, 8]} />

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

      {/* Resume Modal */}
      {showResume && <ResumeModal onClose={() => setShowResume(false)} />}
    </group>
  )
}

function EnhancedWalls() {
  return (
    <group>
      {/* Main room structure */}
      <Box args={[18, 4, 22]} position={[0, 2, 0]}>
        <meshStandardMaterial color="#f8f9fa" transparent opacity={0.1} />
      </Box>

      {/* Decorative wall panels */}
      <WallPanel position={[-8.5, 2, -10]} rotation={[0, 0, 0]} color="#3498db" />
      <WallPanel position={[8.5, 2, -10]} rotation={[0, 0, 0]} color="#e74c3c" />
      <WallPanel position={[-8.5, 2, 10]} rotation={[0, Math.PI, 0]} color="#2ecc71" />
      <WallPanel position={[8.5, 2, 10]} rotation={[0, Math.PI, 0]} color="#f39c12" />

      {/* Geometric wall art */}
      <GeometricWallArt position={[-8, 3, -5]} />
      <GeometricWallArt position={[8, 3, -5]} />
      <GeometricWallArt position={[-8, 3, 5]} />
      <GeometricWallArt position={[8, 3, 5]} />

      {/* Circuit board patterns on walls */}
      <CircuitPattern position={[0, 2, -10.8]} rotation={[0, 0, 0]} />
      <CircuitPattern position={[0, 2, 10.8]} rotation={[0, Math.PI, 0]} />
    </group>
  )
}

function WallPanel({
  position,
  rotation,
  color,
}: { position: [number, number, number]; rotation: [number, number, number]; color: string }) {
  const panelRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (panelRef.current) {
      const material = panelRef.current.material as THREE.MeshStandardMaterial
      material.emissiveIntensity = 0.1 + Math.sin(state.clock.elapsedTime * 2) * 0.05
    }
  })

  return (
    <Box ref={panelRef} args={[1, 3, 0.1]} position={position} rotation={rotation}>
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.1} roughness={0.3} metalness={0.7} />
    </Box>
  )
}

function GeometricWallArt({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Hexagonal pattern */}
      {Array.from({ length: 3 }).map((_, i) =>
        Array.from({ length: 2 }).map((_, j) => (
          <Box
            key={`${i}-${j}`}
            args={[0.3, 0.3, 0.05]}
            position={[i * 0.4 - 0.4, j * 0.4 - 0.2, 0]}
            rotation={[0, 0, Math.PI / 4]}
          >
            <meshStandardMaterial
              color={`hsl(${(i + j) * 60}, 70%, 60%)`}
              emissive={`hsl(${(i + j) * 60}, 70%, 30%)`}
              emissiveIntensity={0.2}
              metalness={0.8}
              roughness={0.2}
            />
          </Box>
        )),
      )}
    </group>
  )
}

function CircuitPattern({
  position,
  rotation,
}: { position: [number, number, number]; rotation: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Circuit lines */}
      {Array.from({ length: 10 }).map((_, i) => (
        <Box key={i} args={[0.05, 2, 0.01]} position={[i * 1.5 - 7.5, 0, 0]}>
          <meshStandardMaterial color="#00ff88" emissive="#004422" emissiveIntensity={0.5} />
        </Box>
      ))}
      {Array.from({ length: 5 }).map((_, i) => (
        <Box key={i} args={[15, 0.05, 0.01]} position={[0, i * 0.8 - 1.6, 0]}>
          <meshStandardMaterial color="#00ff88" emissive="#004422" emissiveIntensity={0.5} />
        </Box>
      ))}
      {/* Circuit nodes */}
      {Array.from({ length: 20 }).map((_, i) => (
        <Box key={i} args={[0.1, 0.1, 0.02]} position={[(Math.random() - 0.5) * 14, (Math.random() - 0.5) * 3, 0]}>
          <meshStandardMaterial color="#ff6b6b" emissive="#ff0000" emissiveIntensity={0.8} />
        </Box>
      ))}
    </group>
  )
}

function NeonLEDLights() {
  const neonRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (neonRef.current) {
      neonRef.current.children.forEach((light, i) => {
        const pointLight = light as THREE.PointLight
        pointLight.intensity = 1 + Math.sin(state.clock.elapsedTime * 3 + i * 0.5) * 0.5
      })
    }
  })

  return (
    <group ref={neonRef}>
      {/* Neon strip lights around the room */}
      {Array.from({ length: 20 }).map((_, i) => (
        <pointLight
          key={`neon-${i}`}
          position={[-8 + i * 0.8, 4, -10]}
          intensity={1}
          color={`hsl(${i * 18}, 100%, 50%)`}
          distance={3}
          decay={2}
        />
      ))}

      {/* Vertical neon strips */}
      {Array.from({ length: 8 }).map((_, i) => (
        <pointLight
          key={`vertical-${i}`}
          position={[-8, 1 + i * 0.5, -10]}
          intensity={0.8}
          color={`hsl(${i * 45 + 180}, 100%, 60%)`}
          distance={2}
          decay={2}
        />
      ))}

      {/* Corner accent lights */}
      <pointLight position={[-8, 3, -10]} intensity={2} color="#ff0080" distance={4} decay={1} />
      <pointLight position={[8, 3, -10]} intensity={2} color="#00ff80" distance={4} decay={1} />
      <pointLight position={[-8, 3, 10]} intensity={2} color="#8000ff" distance={4} decay={1} />
      <pointLight position={[8, 3, 10]} intensity={2} color="#ff8000" distance={4} decay={1} />

      {/* Ceiling neon grid */}
      {Array.from({ length: 5 }).map((_, i) =>
        Array.from({ length: 5 }).map((_, j) => (
          <pointLight
            key={`ceiling-${i}-${j}`}
            position={[-6 + i * 3, 4.5, -6 + j * 3]}
            intensity={0.5}
            color={`hsl(${(i + j) * 36}, 80%, 70%)`}
            distance={2}
            decay={3}
          />
        )),
      )}
    </group>
  )
}

function ResumeSection({ position, onClick }: { position: [number, number, number]; onClick: () => void }) {
  const [hovered, setHovered] = useState(false)
  const resumeRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (resumeRef.current) {
      const targetScale = hovered ? 1.1 : 1
      resumeRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    }
  })

  return (
    <group
      ref={resumeRef}
      position={position}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {/* Resume background */}
      <Plane args={[3, 4]} position={[0, 0, -0.1]}>
        <meshStandardMaterial
          color={hovered ? "#3498db" : "#34495e"}
          emissive={hovered ? "#1a5490" : "#000000"}
          emissiveIntensity={hovered ? 0.3 : 0}
          transparent
          opacity={0.9}
        />
      </Plane>

      <Text position={[0, 1.5, 0]} fontSize={0.4} color="#ffffff" anchorX="center" anchorY="middle">
        📄 My Resume
      </Text>

      <Text position={[0, 0.5, 0]} fontSize={0.2} color="#ffffff" anchorX="center" anchorY="middle">
        Click to View
      </Text>

      <Text position={[0, 0, 0]} fontSize={0.15} color="#ffffff" anchorX="center" anchorY="middle">
        Full Stack Developer
      </Text>

      <Text position={[0, -0.5, 0]} fontSize={0.15} color="#ffffff" anchorX="center" anchorY="middle">
        Skills & Experience
      </Text>

      <Text position={[0, -1, 0]} fontSize={0.15} color="#ffffff" anchorX="center" anchorY="middle">
        Projects & Education
      </Text>

      {hovered && (
        <Text position={[0, -1.5, 0]} fontSize={0.12} color="#3498db" anchorX="center" anchorY="middle">
          Click to open detailed view
        </Text>
      )}
    </group>
  )
}

function ResumeModal({ onClose }: { onClose: () => void }) {
  return (
    <Html
      position={[0, 2, 5]}
      transform
      occlude={false}
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
        pointerEvents: "auto",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.9)",
          backdropFilter: "blur(15px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          animation: "fadeIn 0.3s ease-out",
        }}
        onClick={onClose}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)",
            borderRadius: "20px",
            padding: "40px",
            maxWidth: "900px",
            width: "90%",
            maxHeight: "90%",
            overflow: "auto",
            position: "relative",
            boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)",
            animation: "slideIn 0.4s ease-out",
            color: "white",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              background: "rgba(255, 255, 255, 0.2)",
              border: "none",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              color: "white",
              fontSize: "20px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s ease",
            }}
          >
            ×
          </button>

          {/* Resume Header */}
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <h1 style={{ fontSize: "3rem", margin: "0 0 10px 0", fontWeight: "bold", color: "#3498db" }}>
              Bharanidharan P
            </h1>
            <h2 style={{ fontSize: "1.5rem", margin: "0 0 20px 0", color: "#ecf0f1" }}>
              Aspiring Full Stack Developer
            </h2>
            <div style={{ display: "flex", justifyContent: "center", gap: "30px", flexWrap: "wrap" }}>
              <span>📧 bharani.coder@gmail.com</span>
              <span>📱 +91 9876543210</span>
              <span>📍 Tamil Nadu, India</span>
            </div>
          </div>

          {/* Resume Content */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
            {/* Left Column */}
            <div>
              {/* Education */}
              <section style={{ marginBottom: "30px" }}>
                <h3
                  style={{
                    fontSize: "1.5rem",
                    marginBottom: "15px",
                    color: "#3498db",
                    borderBottom: "2px solid #3498db",
                    paddingBottom: "5px",
                  }}
                >
                  🎓 Education
                </h3>
                <div style={{ background: "rgba(255, 255, 255, 0.1)", padding: "15px", borderRadius: "10px" }}>
                  <h4 style={{ margin: "0 0 5px 0", color: "#e74c3c" }}>Bachelor of Technology</h4>
                  <p style={{ margin: "0 0 5px 0" }}>Information Technology</p>
                  <p style={{ margin: "0", opacity: 0.8 }}>Expected Graduation: 2025</p>
                </div>
              </section>

              {/* Technical Skills */}
              <section style={{ marginBottom: "30px" }}>
                <h3
                  style={{
                    fontSize: "1.5rem",
                    marginBottom: "15px",
                    color: "#3498db",
                    borderBottom: "2px solid #3498db",
                    paddingBottom: "5px",
                  }}
                >
                  💻 Technical Skills
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div>
                    <strong>Frontend:</strong> HTML, CSS, JavaScript, React JS, jQuery
                  </div>
                  <div>
                    <strong>Backend:</strong> Node.js, Express.js
                  </div>
                  <div>
                    <strong>Database:</strong> MongoDB
                  </div>
                  <div>
                    <strong>Languages:</strong> Python, JavaScript
                  </div>
                  <div>
                    <strong>Tools:</strong> Git, VS Code, Postman
                  </div>
                </div>
              </section>

              {/* Certifications */}
              <section>
                <h3
                  style={{
                    fontSize: "1.5rem",
                    marginBottom: "15px",
                    color: "#3498db",
                    borderBottom: "2px solid #3498db",
                    paddingBottom: "5px",
                  }}
                >
                  🏆 Certifications
                </h3>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  <li style={{ padding: "5px 0", borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}>
                    • Full Stack Web Development
                  </li>
                  <li style={{ padding: "5px 0", borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}>
                    • JavaScript Fundamentals
                  </li>
                  <li style={{ padding: "5px 0", borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}>
                    • React.js Development
                  </li>
                </ul>
              </section>
            </div>

            {/* Right Column */}
            <div>
              {/* Projects */}
              <section style={{ marginBottom: "30px" }}>
                <h3
                  style={{
                    fontSize: "1.5rem",
                    marginBottom: "15px",
                    color: "#3498db",
                    borderBottom: "2px solid #3498db",
                    paddingBottom: "5px",
                  }}
                >
                  🚀 Projects
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                  <div style={{ background: "rgba(255, 255, 255, 0.1)", padding: "15px", borderRadius: "10px" }}>
                    <h4 style={{ margin: "0 0 5px 0", color: "#e74c3c" }}>Text to Speech App</h4>
                    <p style={{ margin: "0 0 5px 0", fontSize: "0.9rem" }}>JavaScript, Web Speech API, CSS3</p>
                    <p style={{ margin: "0", opacity: 0.8, fontSize: "0.8rem" }}>
                      Convert text to natural speech with 3D interface
                    </p>
                  </div>
                  <div style={{ background: "rgba(255, 255, 255, 0.1)", padding: "15px", borderRadius: "10px" }}>
                    <h4 style={{ margin: "0 0 5px 0", color: "#e74c3c" }}>Notes Taking App</h4>
                    <p style={{ margin: "0 0 5px 0", fontSize: "0.9rem" }}>React JS, Local Storage, CSS</p>
                    <p style={{ margin: "0", opacity: 0.8, fontSize: "0.8rem" }}>
                      Digital notepad with rich text editing features
                    </p>
                  </div>
                  <div style={{ background: "rgba(255, 255, 255, 0.1)", padding: "15px", borderRadius: "10px" }}>
                    <h4 style={{ margin: "0 0 5px 0", color: "#e74c3c" }}>Age Calculator</h4>
                    <p style={{ margin: "0 0 5px 0", fontSize: "0.9rem" }}>JavaScript, Date API, CSS3</p>
                    <p style={{ margin: "0", opacity: 0.8, fontSize: "0.8rem" }}>
                      Calculate age with precision and visual feedback
                    </p>
                  </div>
                </div>
              </section>

              {/* Soft Skills */}
              <section>
                <h3
                  style={{
                    fontSize: "1.5rem",
                    marginBottom: "15px",
                    color: "#3498db",
                    borderBottom: "2px solid #3498db",
                    paddingBottom: "5px",
                  }}
                >
                  🤝 Soft Skills
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <div>• Problem Solving</div>
                  <div>• Team Collaboration</div>
                  <div>• Communication</div>
                  <div>• Time Management</div>
                  <div>• Adaptability</div>
                  <div>• Critical Thinking</div>
                </div>
              </section>
            </div>
          </div>

          {/* Download Button */}
          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <button
              style={{
                background: "linear-gradient(45deg, #3498db, #2980b9)",
                border: "none",
                padding: "15px 40px",
                borderRadius: "25px",
                color: "white",
                fontSize: "1.1rem",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 5px 15px rgba(52, 152, 219, 0.3)",
              }}
            >
              📥 Download PDF Resume
            </button>
          </div>
        </div>

        <style jsx>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideIn {
            from { transform: translateY(50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        `}</style>
      </div>
    </Html>
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
      <Box args={[4, 0.2, 3]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#8b4513" roughness={0.3} metalness={0.1} />
      </Box>

      {/* Laptop */}
      <group ref={laptopRef} position={[0, 0.5, -0.5]}>
        {/* Laptop base */}
        <Box args={[2, 0.15, 1.5]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#2c3e50" roughness={0.2} metalness={0.8} />
        </Box>

        {/* Laptop screen */}
        <Box args={[2, 1.5, 0.1]} position={[0, 1, -0.7]} rotation={[-0.2, 0, 0]}>
          <meshStandardMaterial color="#1a1a1a" roughness={0.1} metalness={0.9} />
        </Box>

        {/* Screen display */}
        <Box args={[1.8, 1.3, 0.05]} position={[0, 1, -0.65]} rotation={[-0.2, 0, 0]}>
          <meshStandardMaterial color="#000000" emissive="#003366" emissiveIntensity={0.3} />
        </Box>

        {/* Code on screen */}
        <Text
          position={[0, 1, -0.6]}
          rotation={[-0.2, 0, 0]}
          fontSize={0.08}
          color="#00ff00"
          anchorX="center"
          anchorY="middle"
          maxWidth={1.5}
          textAlign="left"
        >
          {`function developer() {
  return "Full Stack";
}`}
        </Text>
      </group>

      {/* Wireless Mouse */}
      <group ref={mouseRef} position={[1.2, 0.25, 0.3]}>
        {/* Mouse body */}
        <Box args={[0.5, 0.2, 0.8]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#34495e" roughness={0.2} metalness={0.7} />
        </Box>

        {/* Mouse scroll wheel */}
        <Box args={[0.08, 0.25, 0.15]} position={[0, 0.05, -0.15]}>
          <meshStandardMaterial color="#2c3e50" roughness={0.3} metalness={0.8} />
        </Box>
      </group>

      {/* Compact Keyboard */}
      <group ref={keyboardRef} position={[-0.8, 0.15, 0.8]}>
        {/* Keyboard base */}
        <Box args={[2.5, 0.2, 1]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#2c3e50" roughness={0.3} metalness={0.6} />
        </Box>

        {/* Keyboard keys */}
        {Array.from({ length: 10 }).map((_, row) =>
          Array.from({ length: 3 }).map((_, col) => (
            <Box key={`${row}-${col}`} args={[0.15, 0.1, 0.15]} position={[-1 + row * 0.2, 0.15, -0.3 + col * 0.2]}>
              <meshStandardMaterial
                color={Math.random() > 0.9 ? "#3498db" : "#ecf0f1"}
                roughness={0.1}
                metalness={0.2}
              />
            </Box>
          )),
        )}
      </group>
    </group>
  )
}
