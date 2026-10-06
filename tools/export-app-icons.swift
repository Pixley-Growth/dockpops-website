// Exports the Studio Pop's nine app icons from the apps installed on this Mac,
// 256 px PNG with alpha, for tools/make-dock-tiles.py.
//   swift tools/export-app-icons.swift tools/studio-icons
import AppKit

let apps: [(String, String)] = [
    ("freeform", "/System/Applications/Freeform.app"),
    ("image-playground", "/System/Applications/Image Playground.app"),
    ("keynote", "/Applications/Keynote Creator Studio.app"),
    ("motion", "/Applications/Motion Creator Studio.app"),
    ("music", "/System/Applications/Music.app"),
    ("photo-booth", "/System/Applications/Photo Booth.app"),
    ("photos", "/System/Applications/Photos.app"),
    ("pixelmator-pro", "/Applications/Pixelmator Pro Creator Studio.app"),
    ("final-cut-pro", "/Applications/Final Cut Pro Creator Studio.app"),
]
let out = URL(fileURLWithPath: CommandLine.arguments[1])
for (slug, path) in apps {
    let icon = NSWorkspace.shared.icon(forFile: path)
    let px = 256
    let rep = NSBitmapImageRep(bitmapDataPlanes: nil, pixelsWide: px, pixelsHigh: px, bitsPerSample: 8,
                               samplesPerPixel: 4, hasAlpha: true, isPlanar: false,
                               colorSpaceName: .deviceRGB, bytesPerRow: 0, bitsPerPixel: 0)!
    NSGraphicsContext.saveGraphicsState()
    NSGraphicsContext.current = NSGraphicsContext(bitmapImageRep: rep)
    NSGraphicsContext.current?.imageInterpolation = .high
    icon.draw(in: NSRect(x: 0, y: 0, width: px, height: px))
    NSGraphicsContext.restoreGraphicsState()
    try! rep.representation(using: .png, properties: [:])!.write(to: out.appendingPathComponent("\(slug).png"))
    print(slug)
}
