import Image from "next/image"

export function DNAHelixBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <Image
        src="/images/dna-helix.jpeg"
        alt="Animated DNA Helix"
        fill={true}
        priority={true}
        className="object-cover object-center opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-transparent" />
    </div>
  )
}
