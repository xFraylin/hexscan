window.SIGNATURES = [

  // ══════════════════════════════════════════════════
  // IMAGES
  // ══════════════════════════════════════════════════
  {
    name: 'JPEG',
    ext: '.jpg, .jpeg, .jpe',
    category: 'images',
    magic: [0xFF, 0xD8, 0xFF],
    offset: 0,
    desc: 'FF D8 FF — the three bytes every camera and phone writes. Lossy compression from 1992 that still dominates the web. Variable quality; higher means bigger file and sharper image.',
    mime: 'image/jpeg'
  },
  {
    name: 'PNG',
    ext: '.png',
    category: 'images',
    magic: [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A],
    offset: 0,
    desc: 'The 8-byte signature was carefully designed: 0x89 catches bad 7-bit transfers, the CR+LF pair detects line-ending translation, and 0x1A stops DOS "type" output. Lossless + transparency.',
    mime: 'image/png'
  },
  {
    name: 'GIF87a',
    ext: '.gif',
    category: 'images',
    magic: [0x47, 0x49, 0x46, 0x38, 0x37, 0x61],
    offset: 0,
    desc: '"GIF87a" — the original 1987 CompuServe format. Up to 256 colors, basic transparency. Replaced in practice by GIF89a once animation became useful.',
    mime: 'image/gif'
  },
  {
    name: 'GIF89a',
    ext: '.gif',
    category: 'images',
    magic: [0x47, 0x49, 0x46, 0x38, 0x39, 0x61],
    offset: 0,
    desc: '"GIF89a" — the 1989 revision that added animation via Graphics Control Extension blocks. The "a" is just the spec version suffix. Still widely used despite PNG being superior for stills.',
    mime: 'image/gif'
  },
  {
    name: 'BMP',
    ext: '.bmp, .dib',
    category: 'images',
    magic: [0x42, 0x4D],
    offset: 0,
    desc: '"BM" — Windows Bitmap since the DOS days. Uncompressed by default: a 1920×1080 24-bit BMP is ~6 MB. Byte 10 tells you where the pixel data starts; bytes 14–17 describe the header type.',
    mime: 'image/bmp'
  },
  {
    name: 'TIFF (little-endian)',
    ext: '.tif, .tiff',
    category: 'images',
    magic: [0x49, 0x49, 0x2A, 0x00],
    offset: 0,
    desc: '"II*\\0" — "II" for Intel (little-endian byte order). Professional imaging standard supporting 32-bit channels, multiple pages, and geodata. Cameras, scanners, and print workflows love it.',
    mime: 'image/tiff'
  },
  {
    name: 'TIFF (big-endian)',
    ext: '.tif, .tiff',
    category: 'images',
    magic: [0x4D, 0x4D, 0x00, 0x2A],
    offset: 0,
    desc: '"MM\\0*" — "MM" for Motorola (big-endian). Identical format to the Intel variant, just with bytes flipped. Some Canon and Nikon RAW formats are TIFF big-endian under the hood.',
    mime: 'image/tiff'
  },
  {
    name: 'ICO',
    ext: '.ico',
    category: 'images',
    magic: [0x00, 0x00, 0x01, 0x00],
    offset: 0,
    desc: 'Windows icon container — four null-ish bytes that are easy to miss. Packs multiple resolutions (16×16 through 256×256) in one file. Modern ICOs embed PNG frames for the larger sizes.',
    mime: 'image/x-icon'
  },
  {
    name: 'WebP',
    ext: '.webp',
    category: 'images',
    magic: [0x52, 0x49, 0x46, 0x46, null, null, null, null, 0x57, 0x45, 0x42, 0x50],
    offset: 0,
    desc: '"RIFF" + 4-byte size + "WEBP" — Google\'s image format built on the RIFF container. Supports lossy, lossless, and animation. Typically 25–34% smaller than JPEG at equivalent quality.',
    mime: 'image/webp'
  },
  {
    name: 'HEIC / HEIF',
    ext: '.heic, .heif',
    category: 'images',
    magic: [0x66, 0x74, 0x79, 0x70, 0x68, 0x65, 0x69, 0x63],
    offset: 4,
    desc: '"ftypheic" at offset 4 — High Efficiency Image Format, default since iPhone 7. ISOBMFF container wrapping HEVC-compressed tiles. Half the file size of JPEG with noticeably better quality.',
    mime: 'image/heic'
  },
  {
    name: 'AVIF',
    ext: '.avif',
    category: 'images',
    magic: [0x66, 0x74, 0x79, 0x70, 0x61, 0x76, 0x69, 0x66],
    offset: 4,
    desc: '"ftypavif" at offset 4 — AV1 Image File Format. Royalty-free, next-generation. A single frame extracted from AV1 video. Outperforms both JPEG and WebP in most compression benchmarks.',
    mime: 'image/avif'
  },
  {
    name: 'PSD (Photoshop)',
    ext: '.psd, .psb',
    category: 'images',
    magic: [0x38, 0x42, 0x50, 0x53],
    offset: 0,
    desc: '"8BPS" — eight bits per sample, Photoshop native. Bytes 4–5 are the version: 1 = PSD (≤30,000 px), 2 = PSB Large Document (≤300,000 px). Preserves every layer, mask, and adjustment.',
    mime: 'image/vnd.adobe.photoshop'
  },
  {
    name: 'SVG',
    ext: '.svg',
    category: 'images',
    magic: [0x3C, 0x73, 0x76, 0x67],
    offset: 0,
    desc: '"<svg" — Scalable Vector Graphics. XML text, resolution-independent, scriptable with JavaScript. This signature only catches SVGs that start directly with the tag (no XML declaration).',
    mime: 'image/svg+xml'
  },
  {
    name: 'XCF (GIMP)',
    ext: '.xcf',
    category: 'images',
    magic: [0x67, 0x69, 0x6D, 0x70, 0x20, 0x78, 0x63, 0x66],
    offset: 0,
    desc: '"gimp xcf" — the native save format of GIMP. Stores layers, channels, paths, and guides in full fidelity. The version string follows immediately (e.g. "gimp xcf v011"). Not widely supported outside GIMP.',
    mime: 'image/x-xcf'
  },

  // ══════════════════════════════════════════════════
  // DOCUMENTS
  // ══════════════════════════════════════════════════
  {
    name: 'PDF',
    ext: '.pdf',
    category: 'documents',
    magic: [0x25, 0x50, 0x44, 0x46],
    offset: 0,
    desc: '"%PDF" — Adobe\'s portable document format since 1993. The version follows immediately (e.g. %PDF-1.7). Cross-reference table at the end points to every object. The world\'s most deployed fixed-layout format.',
    mime: 'application/pdf'
  },
  {
    name: 'RTF',
    ext: '.rtf',
    category: 'documents',
    magic: [0x7B, 0x5C, 0x72, 0x74, 0x66],
    offset: 0,
    desc: '"{\\rtf" — Rich Text Format. Plain ASCII with backslash control words for bold, fonts, colors, etc. Introduced by Microsoft in 1987 as an inter-app exchange format. Still universally supported.',
    mime: 'application/rtf'
  },
  {
    name: 'OLE2 Container (DOC / XLS / PPT / MSI / MSG)',
    ext: '.doc, .xls, .ppt, .msi, .msg, .pub',
    category: 'documents',
    magic: [0xD0, 0xCF, 0x11, 0xE0, 0xA1, 0xB1, 0x1A, 0xE1],
    offset: 0,
    desc: 'Microsoft OLE2 Compound Document — a mini-filesystem embedded in a file. The 8-byte magic is identical for DOC, XLS, PPT (Office 97–2003), MSI installers, Outlook MSG files, and Publisher. Distinguish by CLSID inside.',
    mime: 'application/msword'
  },
  {
    name: 'EPUB',
    ext: '.epub',
    category: 'documents',
    magic: [0x6D, 0x69, 0x6D, 0x65, 0x74, 0x79, 0x70, 0x65],
    offset: 30,
    desc: '"mimetype" at byte 30 — the EPUB spec requires this as the first ZIP entry, stored uncompressed at a fixed offset. It\'s what makes EPUB genuinely distinguishable from a plain ZIP at the byte level.',
    mime: 'application/epub+zip'
  },
  {
    name: 'DjVu',
    ext: '.djvu, .djv',
    category: 'documents',
    magic: [0x41, 0x54, 0x26, 0x54, 0x46, 0x4F, 0x52, 0x4D],
    offset: 0,
    desc: '"AT&TFORM" — developed by AT&T Labs for scanned document compression. Achieves drastically smaller files than PDF for scanned books, especially mixed text and images. Popular in academic archives.',
    mime: 'image/vnd.djvu'
  },

  // ══════════════════════════════════════════════════
  // ARCHIVES / COMPRESSED
  // ══════════════════════════════════════════════════
  {
    name: 'ZIP',
    ext: '.zip, .jar, .apk, .docx, .xlsx, .pptx, .odt, .ods, .odp',
    category: 'archives',
    magic: [0x50, 0x4B, 0x03, 0x04],
    offset: 0,
    desc: '"PK" (Phil Katz\'s initials) + local file header marker. Many modern formats are ZIPs in disguise — DOCX, XLSX, PPTX, EPUB, JAR, APK, and all ODF files share this exact header. Peek inside to tell them apart.',
    mime: 'application/zip'
  },
  {
    name: 'ZIP (empty / spanned)',
    ext: '.zip',
    category: 'archives',
    magic: [0x50, 0x4B, 0x05, 0x06],
    offset: 0,
    desc: '"PK" + End of Central Directory signature. This variant marks an empty archive or the final segment of a multi-part split archive. The 22-byte EOCD record that follows holds total entry count and offset.',
    mime: 'application/zip'
  },
  {
    name: 'RAR v1.5–4',
    ext: '.rar',
    category: 'archives',
    magic: [0x52, 0x61, 0x72, 0x21, 0x1A, 0x07, 0x00],
    offset: 0,
    desc: '"Rar!\\x1A\\x07\\x00" — Roshal Archive, versions 1.5 through 4.x. Eugene Roshal\'s format from 1993. The 0x1A is a DOS EOF marker to prevent text-mode display. 7 bytes long.',
    mime: 'application/x-rar-compressed'
  },
  {
    name: 'RAR v5+',
    ext: '.rar',
    category: 'archives',
    magic: [0x52, 0x61, 0x72, 0x21, 0x1A, 0x07, 0x01, 0x00],
    offset: 0,
    desc: '"Rar!\\x1A\\x07\\x01\\x00" — RAR version 5 and later. The extra 0x01 byte distinguishes v5 from the older format. Redesigned header structure, better Unicode, improved recovery records.',
    mime: 'application/x-rar-compressed'
  },
  {
    name: '7-Zip',
    ext: '.7z',
    category: 'archives',
    magic: [0x37, 0x7A, 0xBC, 0xAF, 0x27, 0x1C],
    offset: 0,
    desc: '"7z" + four signature bytes. Open-source LZMA/LZMA2 compression. Compression ratio is typically 30–70% better than ZIP. The format supports AES-256 encryption and solid archives.',
    mime: 'application/x-7z-compressed'
  },
  {
    name: 'GZIP',
    ext: '.gz, .tgz',
    category: 'archives',
    magic: [0x1F, 0x8B],
    offset: 0,
    desc: '0x1F 0x8B — GNU Zip. Single-file deflate compression with a CRC32 checksum. Byte 3 (FLG) indicates optional fields; byte 8 (OS) marks the originating OS. Almost always paired with TAR.',
    mime: 'application/gzip'
  },
  {
    name: 'BZIP2',
    ext: '.bz2',
    category: 'archives',
    magic: [0x42, 0x5A, 0x68],
    offset: 0,
    desc: '"BZh" — Julian Seward\'s Burrows-Wheeler Transform compressor from 1996. Better ratio than gzip, slower speed. The digit after "BZh" (1–9) is the block size multiplier used during compression.',
    mime: 'application/x-bzip2'
  },
  {
    name: 'XZ',
    ext: '.xz',
    category: 'archives',
    magic: [0xFD, 0x37, 0x7A, 0x58, 0x5A, 0x00],
    offset: 0,
    desc: '0xFD "7zXZ" + null — LZMA2 in a modern container. The default compressor for Linux kernel tarballs and most package managers. The 6-byte magic also validates the stream start before decompressing.',
    mime: 'application/x-xz'
  },
  {
    name: 'Zstandard (ZSTD)',
    ext: '.zst',
    category: 'archives',
    magic: [0x28, 0xB5, 0x2F, 0xFD],
    offset: 0,
    desc: '0x28B52FFD — Facebook\'s 2016 compressor. Extremely fast at both ends, excellent ratio. Used by Linux kernel, Facebook\'s infrastructure, and many databases. The magic is called "Frame_Magic_Number" in the spec.',
    mime: 'application/zstd'
  },
  {
    name: 'LZ4 Frame',
    ext: '.lz4',
    category: 'archives',
    magic: [0x04, 0x22, 0x4D, 0x18],
    offset: 0,
    desc: '0x04224D18 — LZ4 frame magic. Decompression can exceed 10 GB/s — designed for real-time use. Used inside Hadoop, Redis AOF files, and live network streams where latency matters more than ratio.',
    mime: 'application/x-lz4'
  },
  {
    name: 'TAR',
    ext: '.tar',
    category: 'archives',
    magic: [0x75, 0x73, 0x74, 0x61, 0x72],
    offset: 257,
    desc: '"ustar" at byte 257 — the POSIX UStar magic in the first 512-byte header block. TAR itself adds no compression; it just concatenates files with headers. Combine with gzip or xz for the classic tarball.',
    mime: 'application/x-tar'
  },
  {
    name: 'ISO 9660 (CD/DVD Image)',
    ext: '.iso',
    category: 'archives',
    magic: [0x43, 0x44, 0x30, 0x30, 0x31],
    offset: 32769,
    desc: '"CD001" at byte 32769 — the Volume Descriptor at sector 16, offset 1. The 32768-byte lead-in is exactly 16 sectors of 2048 bytes, as specified by ISO 9660 since 1988.',
    mime: 'application/x-iso9660-image'
  },
  {
    name: 'Apple Disk Image (DMG)',
    ext: '.dmg',
    category: 'archives',
    magic: [0x78, 0x01, 0x73, 0x0D, 0x62, 0x62, 0x60],
    offset: 0,
    desc: 'Zlib stream header at offset 0 — the compressed image data starts immediately. DMG files also contain a UDIF resource fork at the very end (the koly block). Used for macOS app distribution.',
    mime: 'application/x-apple-diskimage'
  },
  {
    name: 'CAB (Microsoft Cabinet)',
    ext: '.cab',
    category: 'archives',
    magic: [0x4D, 0x53, 0x43, 0x46],
    offset: 0,
    desc: '"MSCF" — Microsoft Cabinet, the native Windows archive. Used by Windows Update packages, driver installers, and MSI internals. Supports MSZIP (deflate), Quantum, and LZX compression methods.',
    mime: 'application/vnd.ms-cab-compressed'
  },
  {
    name: 'ARJ',
    ext: '.arj',
    category: 'archives',
    magic: [0x60, 0xEA],
    offset: 0,
    desc: '0x60 0xEA — ARJ Archive by Robert Jung, popular on DOS BBSes in the early 1990s. Largely replaced by ZIP and RAR, but still encountered in retro software archives and some vintage game collections.',
    mime: 'application/x-arj'
  },
  {
    name: 'LZH / LHA',
    ext: '.lzh, .lha',
    category: 'archives',
    magic: [0x2D, 0x6C, 0x68],
    offset: 2,
    desc: '"-lh" at byte 2, followed by a compression method identifier (e.g. "5" for -lh5-). LHA by Haruyasu Yoshizaki. Hugely popular in Japan and still the native archive format on classic Amiga systems.',
    mime: 'application/x-lzh-compressed'
  },
  {
    name: 'LZMA (raw stream)',
    ext: '.lzma',
    category: 'archives',
    magic: [0x5D, 0x00, 0x00],
    offset: 0,
    desc: '0x5D 0x00 0x00 — raw LZMA stream. Byte 0 encodes the (lc, lp, pb) property triple. The format that XZ superseded; XZ adds stream headers, integrity checks, and multi-stream support on top.',
    mime: 'application/x-lzma'
  },
  {
    name: 'Zlib / Deflate',
    ext: '.zz, .zlib',
    category: 'archives',
    magic: [0x78, 0x9C],
    offset: 0,
    desc: '0x78 0x9C — zlib header for compression level 6 (the default). The CMF byte (0x78) sets window size; FLG byte (0x9C) makes the two-byte value divisible by 31. This header hides inside PDFs, PNGs, and network protocols.',
    mime: 'application/zlib'
  },
  {
    name: 'WIM (Windows Imaging Format)',
    ext: '.wim, .swm, .esd',
    category: 'archives',
    magic: [0x4D, 0x53, 0x57, 0x49, 0x4D, 0x00, 0x00, 0x00],
    offset: 0,
    desc: '"MSWIM" + 3 null bytes. Microsoft\'s format for Windows installation media. Unique feature: single-instance storage — files duplicated across multiple editions are stored only once. Found in every Windows ISO.',
    mime: 'application/x-ms-wim'
  },

  // ══════════════════════════════════════════════════
  // EXECUTABLES
  // ══════════════════════════════════════════════════
  {
    name: 'PE Executable (EXE / DLL / SYS)',
    ext: '.exe, .dll, .sys, .scr, .drv, .ocx',
    category: 'executables',
    magic: [0x4D, 0x5A],
    offset: 0,
    desc: '"MZ" — Mark Zbikowski\'s initials from 1981. Every Windows executable, DLL, driver, and screensaver opens with these two bytes. The real PE header is pointed to by a 4-byte offset at position 0x3C.',
    mime: 'application/x-msdownload'
  },
  {
    name: 'ELF (Linux / Unix Executable)',
    ext: '.elf, .so, .ko, .axf',
    category: 'executables',
    magic: [0x7F, 0x45, 0x4C, 0x46],
    offset: 0,
    desc: '0x7F "ELF" — Executable and Linkable Format. Standard binary for Linux, Android, BSD, and most Unix systems. Byte 4: 1=32-bit / 2=64-bit. Byte 5: 1=little-endian / 2=big-endian. Byte 7: OS/ABI.',
    mime: 'application/x-elf'
  },
  {
    name: 'Mach-O 32-bit LE (macOS / iOS)',
    ext: '.macho, .o, .dylib',
    category: 'executables',
    magic: [0xCE, 0xFA, 0xED, 0xFE],
    offset: 0,
    desc: '0xCEFAEDFE — "FEED FACE" read backwards. Mach Object, 32-bit little-endian. Used by 32-bit macOS and older iOS apps (pre-iPhone 5s). Apple dropped 32-bit support in macOS Catalina.',
    mime: 'application/x-mach-binary'
  },
  {
    name: 'Mach-O 64-bit LE (macOS / iOS)',
    ext: '.macho, .o, .dylib',
    category: 'executables',
    magic: [0xCF, 0xFA, 0xED, 0xFE],
    offset: 0,
    desc: '0xCFFAEDFE — "FEED FACE" 64-bit variant. All modern macOS apps (Intel and Apple Silicon) are 64-bit Mach-O. The only byte difference from 32-bit LE is 0xCF vs 0xCE at position 0.',
    mime: 'application/x-mach-binary'
  },
  {
    name: 'Mach-O Fat / Universal Binary',
    ext: '.macho',
    category: 'executables',
    magic: [0xCA, 0xFE, 0xBA, 0xBE],
    offset: 0,
    desc: '0xCAFEBABE — "café babe." Fat binary container wrapping multiple architectures (e.g. x86_64 + arm64). Bytes 4–7 (big-endian) give the architecture count. Also the magic for Java .class files.',
    mime: 'application/x-mach-binary'
  },
  {
    name: 'Java Class File',
    ext: '.class',
    category: 'executables',
    magic: [0xCA, 0xFE, 0xBA, 0xBE, 0x00, 0x00],
    offset: 0,
    desc: '0xCAFEBABE + minor version 0 — shared with Mach-O Fat, but Java class files always have minor version bytes 0x00 0x00 at offset 4. Major version at bytes 6–7: 52=Java 8, 61=Java 17, 65=Java 21.',
    mime: 'application/java-vm'
  },
  {
    name: 'Mach-O 32-bit BE (PowerPC)',
    ext: '.macho',
    category: 'executables',
    magic: [0xFE, 0xED, 0xFA, 0xCE],
    offset: 0,
    desc: '0xFEEDFACE — "feed face" in natural big-endian byte order. Mach-O for classic PowerPC Macs. All consumer PowerPC hardware was phased out when Apple switched to Intel in 2006.',
    mime: 'application/x-mach-binary'
  },
  {
    name: 'Mach-O 64-bit BE',
    ext: '.macho',
    category: 'executables',
    magic: [0xFE, 0xED, 0xFA, 0xCF],
    offset: 0,
    desc: '0xFEEDFACF — Mach-O 64-bit big-endian. Rare in practice; no consumer hardware shipped with it. Distinguishable from 32-bit BE only by the last byte: 0xCF vs 0xCE.',
    mime: 'application/x-mach-binary'
  },
  {
    name: 'DEX (Android Bytecode)',
    ext: '.dex',
    category: 'executables',
    magic: [0x64, 0x65, 0x78, 0x0A, 0x30, 0x33, 0x35, 0x00],
    offset: 0,
    desc: '"dex\\n035\\0" — Dalvik Executable format. Every Android APK contains at least one .dex file. "035" is the DEX version number. Android 5.0+ compiles DEX to native code via ART at install time.',
    mime: 'application/vnd.android.dex'
  },
  {
    name: 'WebAssembly (WASM)',
    ext: '.wasm',
    category: 'executables',
    magic: [0x00, 0x61, 0x73, 0x6D],
    offset: 0,
    desc: '0x00 "asm" — WebAssembly binary module. Bytes 4–7 are the version (currently 0x01 0x00 0x00 0x00). Designed for near-native speed in browsers and beyond. Increasingly used for server-side sandboxing too.',
    mime: 'application/wasm'
  },
  {
    name: 'NE Executable (16-bit Windows)',
    ext: '.exe, .dll',
    category: 'executables',
    magic: [0x4E, 0x45],
    offset: 0,
    desc: '"NE" — New Executable, the 16-bit format for Windows 3.x and OS/2. Succeeded MZ for protected-mode Windows apps; was itself replaced by PE when Win32 arrived in Windows NT.',
    mime: 'application/x-ne-executable'
  },
  {
    name: 'Python Bytecode (.pyc)',
    ext: '.pyc',
    category: 'executables',
    magic: [0x55, 0x0D, 0x0D, 0x0A],
    offset: 0,
    desc: 'Python 3.x compiled bytecode — magic number 0x550D0D0A identifies Python 3.3+. The next 4 bytes are flags, then a timestamp or hash. The body is a marshal-serialized code object.',
    mime: 'application/x-python-bytecode'
  },

  // ══════════════════════════════════════════════════
  // AUDIO
  // ══════════════════════════════════════════════════
  {
    name: 'MP3 (ID3v2 tag)',
    ext: '.mp3',
    category: 'audio',
    magic: [0x49, 0x44, 0x33],
    offset: 0,
    desc: '"ID3" — MP3 file with an ID3v2 metadata block at the front. Contains artist, title, artwork, and lyrics before the actual MPEG audio frames. Nearly every MP3 you download starts this way.',
    mime: 'audio/mpeg'
  },
  {
    name: 'MP3 (raw MPEG frame)',
    ext: '.mp3',
    category: 'audio',
    magic: [0xFF, 0xFB],
    offset: 0,
    desc: '0xFF 0xFB — MPEG-1, Layer 3 frame sync with 128 kbps CBR. No ID3 header — audio starts immediately. The upper 11 bits are always set; the lower nibble of byte 1 encodes the bitrate index.',
    mime: 'audio/mpeg'
  },
  {
    name: 'WAV (RIFF)',
    ext: '.wav',
    category: 'audio',
    magic: [0x52, 0x49, 0x46, 0x46, null, null, null, null, 0x57, 0x41, 0x56, 0x45],
    offset: 0,
    desc: '"RIFF" + 4-byte file size + "WAVE" — uncompressed PCM in a RIFF container. Lossless and universal; 1 minute of CD-quality stereo is about 10 MB. "fmt " and "data" chunks follow the header.',
    mime: 'audio/wav'
  },
  {
    name: 'FLAC',
    ext: '.flac',
    category: 'audio',
    magic: [0x66, 0x4C, 0x61, 0x43],
    offset: 0,
    desc: '"fLaC" — Free Lossless Audio Codec. The unusual capitalization is intentional in the spec. Compresses CD audio to ~50–60% of WAV size with mathematically perfect reconstruction. Audiophile standard.',
    mime: 'audio/flac'
  },
  {
    name: 'OGG (Vorbis / Opus / Theora)',
    ext: '.ogg, .oga, .opus',
    category: 'audio',
    magic: [0x4F, 0x67, 0x67, 0x53],
    offset: 0,
    desc: '"OggS" — Ogg page capture pattern. A page-based transport container for Vorbis audio, Opus speech, and Theora video. Byte 4 is always 0 (stream structure version). Entirely patent-free.',
    mime: 'audio/ogg'
  },
  {
    name: 'MIDI',
    ext: '.mid, .midi',
    category: 'audio',
    magic: [0x4D, 0x54, 0x68, 0x64],
    offset: 0,
    desc: '"MThd" — MIDI Header chunk. MIDI doesn\'t store audio — it stores musical events: note on/off, velocity, pitch bend, etc. A 1 MB MIDI file can represent a full orchestral score.',
    mime: 'audio/midi'
  },
  {
    name: 'AIFF',
    ext: '.aiff, .aif',
    category: 'audio',
    magic: [0x46, 0x4F, 0x52, 0x4D, null, null, null, null, 0x41, 0x49, 0x46, 0x46],
    offset: 0,
    desc: '"FORM" + size + "AIFF" — Apple\'s Audio Interchange File Format from 1988. Uncompressed PCM in a RIFF-like container. Standard in professional audio tools on Mac. AIFF-C adds compression variants.',
    mime: 'audio/aiff'
  },
  {
    name: 'AAC (ADTS stream)',
    ext: '.aac',
    category: 'audio',
    magic: [0xFF, 0xF1],
    offset: 0,
    desc: '0xFF 0xF1 — MPEG-4 AAC in Audio Data Transport Stream format. The 12-bit sync word is always 0xFFF; bit 4 of byte 1 distinguishes MPEG-4 (0) from MPEG-2 (1). Used in broadcast and streaming.',
    mime: 'audio/aac'
  },
  {
    name: 'M4A (MPEG-4 Audio)',
    ext: '.m4a, .m4b',
    category: 'audio',
    magic: [0x66, 0x74, 0x79, 0x70, 0x4D, 0x34, 0x41, 0x20],
    offset: 4,
    desc: '"ftypM4A " at offset 4 — Apple\'s ISOBMFF brand for AAC-in-MP4. The trailing space is part of the 4-byte brand string. Essentially an MP4 file with only an audio track inside.',
    mime: 'audio/mp4'
  },
  {
    name: 'WMA / ASF (Windows Media)',
    ext: '.wma, .wmv, .asf',
    category: 'audio',
    magic: [0x30, 0x26, 0xB2, 0x75, 0x8E, 0x66, 0xCF, 0x11],
    offset: 0,
    desc: 'ASF Header Object GUID (first 8 bytes of a 128-bit identifier). Advanced Systems Format — Microsoft\'s container for WMA audio and WMV video. The full GUID uniquely identifies the Header Object type.',
    mime: 'audio/x-ms-wma'
  },
  {
    name: 'AU (Sun / NeXT Audio)',
    ext: '.au, .snd',
    category: 'audio',
    magic: [0x2E, 0x73, 0x6E, 0x64],
    offset: 0,
    desc: '".snd" — Sun and NeXT audio format, predating WAV and AIFF. Bytes 4–7: header size. Bytes 8–11: data size. Bytes 12–15: encoding type. Still produced by some Unix tools; Java AudioSystem outputs it by default.',
    mime: 'audio/basic'
  },

  // ══════════════════════════════════════════════════
  // VIDEO
  // ══════════════════════════════════════════════════
  {
    name: 'MP4 / MOV / M4V (ISOBMFF)',
    ext: '.mp4, .m4v, .mov, .m4b, .3gp',
    category: 'video',
    magic: [0x66, 0x74, 0x79, 0x70],
    offset: 4,
    desc: '"ftyp" at offset 4 — ISO Base Media File Format brand marker. The 4 bytes that follow identify the specific subtype: "isom" (generic MP4), "M4V " (iTunes), "qt  " (QuickTime), "3gp5" (3GP), etc.',
    mime: 'video/mp4'
  },
  {
    name: 'AVI (RIFF)',
    ext: '.avi',
    category: 'video',
    magic: [0x52, 0x49, 0x46, 0x46, null, null, null, null, 0x41, 0x56, 0x49, 0x20],
    offset: 0,
    desc: '"RIFF" + size + "AVI " — Audio Video Interleave, Microsoft\'s 1992 video container. Capped at 4 GB (OpenDML extends this). Still produced by security cameras, dashcams, and game capture cards.',
    mime: 'video/x-msvideo'
  },
  {
    name: 'MKV / WebM (Matroska / EBML)',
    ext: '.mkv, .webm, .mka, .mks',
    category: 'video',
    magic: [0x1A, 0x45, 0xDF, 0xA3],
    offset: 0,
    desc: '0x1A45DFA3 — EBML "Document" element ID. The outermost structure of every Matroska file. MKV and WebM both open with this; WebM is a restricted Matroska profile designed for the web.',
    mime: 'video/x-matroska'
  },
  {
    name: 'FLV (Flash Video)',
    ext: '.flv',
    category: 'video',
    magic: [0x46, 0x4C, 0x56, 0x01],
    offset: 0,
    desc: '"FLV\\x01" — Flash Video, the backbone of YouTube before HTML5 video. Byte 3 is always the version (1). YouTube finished retiring Flash in 2015, but FLV files still appear widely in old archives.',
    mime: 'video/x-flv'
  },
  {
    name: 'MPEG-1 / MPEG-2 (Program Stream)',
    ext: '.mpg, .mpeg, .m2v, .vob',
    category: 'video',
    magic: [0x00, 0x00, 0x01, 0xBA],
    offset: 0,
    desc: '0x000001BA — MPEG Pack Start Code for Program Stream. Found at the start of DVD VOB files, VCDs, and broadcast MPEG streams. The next 2 bits distinguish MPEG-1 (01) from MPEG-2 (11).',
    mime: 'video/mpeg'
  },
  {
    name: 'MPEG-2 Transport Stream',
    ext: '.ts, .m2ts, .mts',
    category: 'video',
    magic: [0x47],
    offset: 0,
    desc: '0x47 (\'G\') — MPEG-2 TS sync byte, repeating every 188 bytes. Broadcast TV, Blu-ray, and DVB streaming all use this format. The sync byte is how decoders lock on to packet boundaries in a continuous stream.',
    mime: 'video/mp2t'
  },
  {
    name: 'RealMedia',
    ext: '.rm, .rmvb',
    category: 'video',
    magic: [0x2E, 0x52, 0x4D, 0x46],
    offset: 0,
    desc: '".RMF" — RealMedia file header. Pioneered buffered internet streaming video in the late 1990s. RMVB is the Variable Bit Rate variant. Still found in pre-2010 streaming archives and some Asian media.',
    mime: 'application/vnd.rn-realmedia'
  },

  // ══════════════════════════════════════════════════
  // DATABASES
  // ══════════════════════════════════════════════════
  {
    name: 'SQLite',
    ext: '.sqlite, .db, .db3, .s3db, .sqlite3',
    category: 'databases',
    magic: [0x53, 0x51, 0x4C, 0x69, 0x74, 0x65, 0x20, 0x66, 0x6F, 0x72, 0x6D, 0x61, 0x74, 0x20, 0x33, 0x00],
    offset: 0,
    desc: '"SQLite format 3\\0" — intentionally human-readable 16-byte header. The most deployed database on Earth: every Android and iOS device, every browser, and most desktop apps embed it.',
    mime: 'application/x-sqlite3'
  },
  {
    name: 'MS Access 97–2003 (MDB)',
    ext: '.mdb',
    category: 'databases',
    magic: [0x00, 0x01, 0x00, 0x00, 0x53, 0x74, 0x61, 0x6E, 0x64, 0x61, 0x72, 0x64, 0x20, 0x4A, 0x65, 0x74],
    offset: 0,
    desc: '"Standard Jet" starting at byte 4 — Microsoft Access and Jet Database Engine format. Used by Access 97 through 2003. Byte 0x14 holds the Jet version (3 or 4).',
    mime: 'application/msaccess'
  },
  {
    name: 'MS Access 2007+ (ACCDB)',
    ext: '.accdb',
    category: 'databases',
    magic: [0x00, 0x01, 0x00, 0x00, 0x53, 0x74, 0x61, 0x6E, 0x64, 0x61, 0x72, 0x64, 0x20, 0x41, 0x43, 0x45],
    offset: 0,
    desc: '"Standard ACE" at byte 4 — Access Connectivity Engine, the successor to Jet. Used by Access 2007 and later. Supports larger databases, stronger encryption, and multi-valued field types.',
    mime: 'application/msaccess'
  },
  {
    name: 'MySQL Table Definition (.frm)',
    ext: '.frm',
    category: 'databases',
    magic: [0xFE, 0x01],
    offset: 0,
    desc: '0xFE 0x01 — MySQL table definition file. Stores schema metadata for MyISAM and InnoDB tables in MySQL 5.x and earlier. MariaDB and MySQL 8.0+ moved to a data dictionary inside InnoDB.',
    mime: 'application/x-mysql-frm'
  },
  {
    name: 'Berkeley DB',
    ext: '.db',
    category: 'databases',
    magic: [0x00, 0x06, 0x15, 0x61],
    offset: 0,
    desc: '0x00061561 — Oracle Berkeley DB embedded key-value store. Used by Firefox (history/cookies), LDAP servers (OpenLDAP), and many Unix applications. Supports B-tree, Hash, Queue, and Recno access methods.',
    mime: 'application/x-berkeley-db'
  },
  {
    name: 'Apache Parquet',
    ext: '.parquet',
    category: 'databases',
    magic: [0x50, 0x41, 0x52, 0x31],
    offset: 0,
    desc: '"PAR1" — Apache Parquet columnar storage format. The same 4-byte magic also appears at the very end of the file as a footer terminator. Widely used in data lakes, Spark, and Hadoop ecosystems.',
    mime: 'application/x-parquet'
  },
  {
    name: 'Apache Avro',
    ext: '.avro',
    category: 'databases',
    magic: [0x4F, 0x62, 0x6A, 0x01],
    offset: 0,
    desc: '"Obj\\x01" — Apache Avro data file. Byte 3 (0x01) is the format version. Schema is embedded as JSON in the file header before any data records. Used heavily in Kafka and Hadoop pipelines.',
    mime: 'application/x-avro'
  },

  // ══════════════════════════════════════════════════
  // CRYPTO / CERTIFICATES / KEYS
  // ══════════════════════════════════════════════════
  {
    name: 'PEM (ASCII Armor)',
    ext: '.pem, .crt, .cer, .key',
    category: 'crypto',
    magic: [0x2D, 0x2D, 0x2D, 0x2D, 0x2D, 0x42, 0x45, 0x47, 0x49, 0x4E],
    offset: 0,
    desc: '"-----BEGIN" — Privacy-Enhanced Mail ASCII armor. Base64-encoded DER data wrapped in text banners. What follows "BEGIN " tells you the content type: CERTIFICATE, PRIVATE KEY, PUBLIC KEY, etc.',
    mime: 'application/x-pem-file'
  },
  {
    name: 'DER Certificate (binary X.509)',
    ext: '.der, .cer',
    category: 'crypto',
    magic: [0x30, 0x82],
    offset: 0,
    desc: '0x30 0x82 — ASN.1 DER SEQUENCE with a 2-byte length (up to 64 KB). Raw binary X.509 certificate, no base64 wrapping. 0x30 is the SEQUENCE tag; 0x82 means the length spans the next 2 bytes.',
    mime: 'application/x-x509-ca-cert'
  },
  {
    name: 'PKCS#12 / PFX (Key + Certificate Bundle)',
    ext: '.pfx, .p12',
    category: 'crypto',
    magic: [0x30, 0x82, null, null, 0x02, 0x01, 0x03],
    offset: 0,
    desc: 'DER SEQUENCE containing INTEGER 3 — the PKCS#12 version field. Bundles private key + certificate chain in one encrypted file. Standard for exporting keys in browsers and Windows certificate stores.',
    mime: 'application/x-pkcs12'
  },
  {
    name: 'OpenPGP / GPG (binary keyring)',
    ext: '.gpg, .pgp',
    category: 'crypto',
    magic: [0x99],
    offset: 0,
    desc: '0x99 — old-format OpenPGP packet tag for a Public Key packet (length-type 2). Binary keyring or encrypted message. The PGP packet format dates to Phil Zimmermann\'s original 1991 release.',
    mime: 'application/pgp-encrypted'
  },
  {
    name: 'OpenPGP / GPG (ASCII-armored)',
    ext: '.asc',
    category: 'crypto',
    magic: [0x2D, 0x2D, 0x2D, 0x2D, 0x2D, 0x42, 0x45, 0x47, 0x49, 0x4E, 0x20, 0x50, 0x47, 0x50],
    offset: 0,
    desc: '"-----BEGIN PGP" — OpenPGP ASCII-armored block. Could be a public key, encrypted message, signed message, or detached signature. The armor type on the same line clarifies which one.',
    mime: 'application/pgp-signature'
  },
  {
    name: 'OpenSSH Private Key (new format)',
    ext: '.pem, .key',
    category: 'crypto',
    magic: [0x2D, 0x2D, 0x2D, 0x2D, 0x2D, 0x42, 0x45, 0x47, 0x49, 0x4E, 0x20, 0x4F, 0x50, 0x45, 0x4E, 0x53, 0x53, 0x48],
    offset: 0,
    desc: '"-----BEGIN OPENSSH" — OpenSSH\'s native private key format, introduced in OpenSSH 6.5 (2014). More secure than PEM-wrapped RSA; natively supports ed25519, ecdsa, and bcrypt-based key encryption.',
    mime: 'application/x-pem-file'
  },
  {
    name: 'Java KeyStore (JKS)',
    ext: '.jks, .keystore',
    category: 'crypto',
    magic: [0xFE, 0xED, 0xFE, 0xED],
    offset: 0,
    desc: '0xFEEDFEED — Java KeyStore magic. Password-protected binary store for X.509 certificates and private keys. Used by Tomcat, Kafka, and Java applications. Largely superseded by PKCS12 in Java 9+.',
    mime: 'application/x-java-keystore'
  },

  // ══════════════════════════════════════════════════
  // TEXT / CODE
  // ══════════════════════════════════════════════════
  {
    name: 'UTF-8 BOM',
    ext: '.txt, .html, .xml, .csv',
    category: 'text',
    magic: [0xEF, 0xBB, 0xBF],
    offset: 0,
    desc: '0xEF 0xBB 0xBF — UTF-8 Byte Order Mark. Technically unnecessary (UTF-8 has no byte-order ambiguity), but Windows Notepad has written it for decades. Frequently breaks parsers that don\'t expect it.',
    mime: 'text/plain'
  },
  {
    name: 'UTF-16 Little-Endian BOM',
    ext: '.txt, .xml',
    category: 'text',
    magic: [0xFF, 0xFE],
    offset: 0,
    desc: '0xFF 0xFE — UTF-16 LE Byte Order Mark. Each Unicode code unit is 2 bytes, least significant first. Common in Windows "Unicode" text files and some Windows API output.',
    mime: 'text/plain'
  },
  {
    name: 'UTF-16 Big-Endian BOM',
    ext: '.txt, .xml',
    category: 'text',
    magic: [0xFE, 0xFF],
    offset: 0,
    desc: '0xFE 0xFF — UTF-16 BE Byte Order Mark. Most significant byte first. Common on older Mac and Java systems. Same data as UTF-16 LE but with each code unit\'s bytes swapped.',
    mime: 'text/plain'
  },
  {
    name: 'UTF-32 Little-Endian BOM',
    ext: '.txt',
    category: 'text',
    magic: [0xFF, 0xFE, 0x00, 0x00],
    offset: 0,
    desc: '0xFF 0xFE 0x00 0x00 — UTF-32 LE BOM. Each code point uses exactly 4 bytes. Wastes enormous space; rarely seen in practice. UTF-8 is preferred for almost all real-world text encoding.',
    mime: 'text/plain'
  },
  {
    name: 'XML Document',
    ext: '.xml, .svg, .xhtml, .xsd, .rss, .atom',
    category: 'text',
    magic: [0x3C, 0x3F, 0x78, 0x6D, 0x6C],
    offset: 0,
    desc: '"<?xml" — XML declaration header. Usually followed by version="1.0" and an optional encoding attribute. RSS feeds, SOAP messages, SVG, and countless config formats are XML at their core.',
    mime: 'application/xml'
  },
  {
    name: 'HTML Document',
    ext: '.html, .htm',
    category: 'text',
    magic: [0x3C, 0x21, 0x44, 0x4F, 0x43, 0x54, 0x59, 0x50, 0x45],
    offset: 0,
    desc: '"<!DOCTYPE" — HTML doctype declaration. Modern pages use "<!DOCTYPE html>" (HTML5). Its presence tells browsers to use standards rendering mode rather than quirks mode.',
    mime: 'text/html'
  },
  {
    name: 'JSON',
    ext: '.json',
    category: 'text',
    magic: [0x7B, 0x0A],
    offset: 0,
    desc: '"{\\n" — JSON object with a newline after the opening brace (pretty-printed). Covers the most common API response format. Note: JSON arrays start with "[" and won\'t match this signature.',
    mime: 'application/json'
  },
  {
    name: 'Unix Script (shebang)',
    ext: '.sh, .py, .rb, .pl, .zsh, .fish',
    category: 'text',
    magic: [0x23, 0x21],
    offset: 0,
    desc: '"#!" — the Unix shebang line. The kernel reads the rest of the line to find the interpreter path (e.g. #!/usr/bin/env python3). Invented around 1980 by Dennis Ritchie; added to Unix V8.',
    mime: 'text/x-shellscript'
  },
  {
    name: 'Windows Batch Script',
    ext: '.bat, .cmd',
    category: 'text',
    magic: [0x40, 0x65, 0x63, 0x68, 0x6F],
    offset: 0,
    desc: '"@echo" — Windows batch script starting with "@echo off", which suppresses command echoing. The @ prevents the echo command itself from being printed. Standard opening line for CMD scripts.',
    mime: 'text/x-batch'
  },

  // ══════════════════════════════════════════════════
  // FORENSIC / MEMORY / NETWORK
  // ══════════════════════════════════════════════════
  {
    name: 'PCAP (little-endian)',
    ext: '.pcap, .cap',
    category: 'forensic',
    magic: [0xD4, 0xC3, 0xB2, 0xA1],
    offset: 0,
    desc: '0xD4C3B2A1 — pcap global header magic, little-endian. Network packet capture from Wireshark, tcpdump, or similar. The magic value is 0xA1B2C3D4 flipped; the format encodes timestamps per packet.',
    mime: 'application/vnd.tcpdump.pcap'
  },
  {
    name: 'PCAP (big-endian)',
    ext: '.pcap',
    category: 'forensic',
    magic: [0xA1, 0xB2, 0xC3, 0xD4],
    offset: 0,
    desc: '0xA1B2C3D4 — same pcap format in big-endian byte order. Less common than the little-endian variant. The swapped magic tells pcap parsers which byte order to use for all subsequent fields.',
    mime: 'application/vnd.tcpdump.pcap'
  },
  {
    name: 'PCAPng (Next Generation Capture)',
    ext: '.pcapng',
    category: 'forensic',
    magic: [0x0A, 0x0D, 0x0D, 0x0A],
    offset: 0,
    desc: '0x0A0D0D0A — Section Header Block. The byte pattern was chosen to detect CR/LF translation (0x0D 0x0A). PCAPng supports multiple interfaces, observer annotations, and encrypted packet data in one file.',
    mime: 'application/vnd.tcpdump.pcap'
  },
  {
    name: 'Windows Event Log (EVTX)',
    ext: '.evtx',
    category: 'forensic',
    magic: [0x45, 0x6C, 0x66, 0x46, 0x69, 0x6C, 0x65, 0x00],
    offset: 0,
    desc: '"ElfFile\\0" — Windows XML Event Log, introduced in Vista. Events are stored as Binary XML (BINXML) in 64 KB chunks. Critical artifact in Windows forensic investigations; correlate with PCAP for full picture.',
    mime: 'application/x-ms-evtx'
  },
  {
    name: 'Windows Event Log Legacy (EVT)',
    ext: '.evt',
    category: 'forensic',
    magic: [0x30, 0x00, 0x00, 0x00, 0x4C, 0x66, 0x4C, 0x65],
    offset: 0,
    desc: '0x30000000 "LfLe" — Windows legacy event log (XP and earlier). "LfLe" is the log file magic; the preceding 0x30000000 is the header size. Analyzed with tools like LogParser or Event Log Explorer.',
    mime: 'application/x-ms-evt'
  },
  {
    name: 'Windows Shortcut (LNK)',
    ext: '.lnk',
    category: 'forensic',
    magic: [0x4C, 0x00, 0x00, 0x00, 0x01, 0x14, 0x02, 0x00],
    offset: 0,
    desc: 'Shell Link CLSID header — LNK files pack forensic gold: target path, timestamps, volume serial number, MAC address of source machine. SANS calls LNK files the "Swiss Army knife" of Windows forensics.',
    mime: 'application/x-ms-shortcut'
  },
  {
    name: 'E01 (EnCase Evidence File)',
    ext: '.e01, .ex01',
    category: 'forensic',
    magic: [0x45, 0x56, 0x46, 0x09, 0x0D, 0x0A, 0xFF, 0x00],
    offset: 0,
    desc: '"EVF\\x09\\x0D\\x0A\\xFF\\x00" — EnCase Evidence File. De-facto law enforcement forensic disk image standard. Stores data in 64-sector chunks with CRC32 per chunk and MD5/SHA1 of the full image.',
    mime: 'application/x-encase'
  },
  {
    name: 'AFF (Advanced Forensic Format)',
    ext: '.aff',
    category: 'forensic',
    magic: [0x41, 0x46, 0x46],
    offset: 0,
    desc: '"AFF" — open-source forensic disk image format by Simson Garfinkel. Supports compression, encryption, and rich metadata. Created as a transparent, documented alternative to proprietary E01.',
    mime: 'application/x-aff'
  },
  {
    name: 'Windows Memory Dump (PAGEDUMP)',
    ext: '.raw, .mem, .bin',
    category: 'forensic',
    magic: [0x50, 0x41, 0x47, 0x45, 0x44, 0x55, 0x4D, 0x50],
    offset: 0,
    desc: '"PAGEDUMP" — Windows kernel memory dump. Analyzed with Volatility or Rekall to extract processes, network connections, registry hives, and cryptographic keys from a captured RAM image.',
    mime: 'application/octet-stream'
  },
  {
    name: 'Windows Crash Dump (Minidump)',
    ext: '.dmp, .mdmp',
    category: 'forensic',
    magic: [0x4D, 0x44, 0x4D, 0x50, 0x93, 0xA7],
    offset: 0,
    desc: '"MDMP" + version bytes — Windows Minidump. Generated automatically on application crashes via WER. Contains thread stacks, loaded modules, and optionally full heap data. Open with WinDbg or Visual Studio.',
    mime: 'application/x-dmp'
  },
  {
    name: 'Windows Prefetch',
    ext: '.pf',
    category: 'forensic',
    magic: [0x53, 0x43, 0x43, 0x41],
    offset: 4,
    desc: '"SCCA" at byte 4 — Windows Prefetch file. Records the last 8 execution timestamps and every file accessed in the first 10 seconds after launch. Proves a program ran even after it\'s deleted.',
    mime: 'application/x-ms-prefetch'
  },
  {
    name: 'Windows Registry Hive',
    ext: '.dat, .ntuser.dat, .hiv',
    category: 'forensic',
    magic: [0x72, 0x65, 0x67, 0x66],
    offset: 0,
    desc: '"regf" — Windows Registry hive file. Stores the key/value tree for HKLM, HKCU, etc. Forensic analysis with RegRipper or Registry Explorer reveals user activity, installed software, and system configuration.',
    mime: 'application/octet-stream'
  },
  {
    name: 'Windows Thumbnail Cache',
    ext: '.db',
    category: 'forensic',
    magic: [0x43, 0x4D, 0x4D, 0x4D],
    offset: 0,
    desc: '"CMMM" — Windows Thumbcache database, generated by Explorer. Thumbnails can persist long after the source files are deleted. Valuable in image-based investigations: extract with Thumbcache Viewer.',
    mime: 'application/octet-stream'
  },

  // ══════════════════════════════════════════════════
  // FONTS
  // ══════════════════════════════════════════════════
  {
    name: 'TrueType Font (TTF)',
    ext: '.ttf, .tte',
    category: 'fonts',
    magic: [0x00, 0x01, 0x00, 0x00, 0x00],
    offset: 0,
    desc: '0x00010000 — TrueType "sfVersion" field, meaning "TrueType outlines." Jointly developed by Apple and Microsoft in the late 1980s as an alternative to Adobe Type 1. The dominant font format for the past 30 years.',
    mime: 'font/ttf'
  },
  {
    name: 'OpenType Font (OTF)',
    ext: '.otf',
    category: 'fonts',
    magic: [0x4F, 0x54, 0x54, 0x4F],
    offset: 0,
    desc: '"OTTO" — OpenType font with CFF (PostScript) outlines. When you see "OTTO" instead of the null-byte TrueType header, glyph data uses Compact Font Format cubic curves rather than TrueType quadratics.',
    mime: 'font/otf'
  },
  {
    name: 'WOFF (Web Open Font Format)',
    ext: '.woff',
    category: 'fonts',
    magic: [0x77, 0x4F, 0x46, 0x46],
    offset: 0,
    desc: '"wOFF" — Web Open Font Format. Compresses TrueType or OpenType table data with zlib for web delivery. Superseded by WOFF2 for new projects but still widely served for compatibility.',
    mime: 'font/woff'
  },
  {
    name: 'WOFF2',
    ext: '.woff2',
    category: 'fonts',
    magic: [0x77, 0x4F, 0x46, 0x32],
    offset: 0,
    desc: '"wOF2" — Web Open Font Format 2. Uses Brotli compression instead of zlib, achieving ~30% smaller files than WOFF. The current standard for web font delivery; supported everywhere since 2016.',
    mime: 'font/woff2'
  },
  {
    name: 'EOT (Embedded OpenType)',
    ext: '.eot',
    category: 'fonts',
    magic: [0x4C, 0x50],
    offset: 8,
    desc: '"LP" at byte 8 — Embedded OpenType, Microsoft\'s proprietary web font format required by IE 6–8. Obsolete since IE9 added WOFF support in 2011, but still shipped in some legacy CSS bundles.',
    mime: 'application/vnd.ms-fontobject'
  },
  {
    name: 'PostScript Type 1 Font (PFB)',
    ext: '.pfb',
    category: 'fonts',
    magic: [0x80, 0x01],
    offset: 0,
    desc: '0x80 0x01 — PostScript Type 1 binary font, PFB segment header. Type 1 was Adobe\'s professional standard before OpenType. 0x80 is the PFB start-of-segment marker; 0x01 indicates an ASCII segment.',
    mime: 'application/x-font-pfb'
  },

  // ══════════════════════════════════════════════════
  // OTHER
  // ══════════════════════════════════════════════════
  {
    name: 'BitTorrent Metainfo',
    ext: '.torrent',
    category: 'other',
    magic: [0x64, 0x38, 0x3A, 0x61, 0x6E, 0x6E, 0x6F, 0x75, 0x6E, 0x63, 0x65],
    offset: 0,
    desc: '"d8:announce" — bencoded dictionary starting with the tracker URL key. Bencoding: "d" = dict start, "8" = key length, "announce" = key name. A .torrent is entirely human-readable if you know bencoding.',
    mime: 'application/x-bittorrent'
  },
  {
    name: 'Outlook PST / OST',
    ext: '.pst, .ost',
    category: 'other',
    magic: [0x21, 0x42, 0x44, 0x4E],
    offset: 0,
    desc: '"!BDN" — Microsoft Outlook Personal/Offline Storage Table. PST is an exported mailbox; OST is the local sync cache. Both share this header. Standard format for email archival and forensic examination.',
    mime: 'application/vnd.ms-outlook'
  },
  {
    name: 'Mbox (Unix Mail Spool)',
    ext: '.mbox, .mbx',
    category: 'other',
    magic: [0x46, 0x72, 0x6F, 0x6D, 0x20, 0x20],
    offset: 0,
    desc: '"From  " (with two spaces) — Unix mbox format. All emails concatenated in a single text file, each message separated by a "From " line with a timestamp. Used by Thunderbird, Mutt, and countless Unix mailers since the 1970s.',
    mime: 'application/mbox'
  },
  {
    name: 'EML (RFC 822 Email)',
    ext: '.eml',
    category: 'other',
    magic: [0x52, 0x65, 0x74, 0x75, 0x72, 0x6E, 0x2D, 0x50, 0x61, 0x74, 0x68],
    offset: 0,
    desc: '"Return-Path" — individual email file in RFC 822/5322 format. Header fields come first (From, To, Subject…), then a blank line, then the body. Saved by Outlook Express, Thunderbird, and Apple Mail.',
    mime: 'message/rfc822'
  },
  {
    name: 'VHD (Virtual Hard Disk)',
    ext: '.vhd',
    category: 'other',
    magic: [0x63, 0x6F, 0x6E, 0x65, 0x63, 0x74, 0x69, 0x78],
    offset: 0,
    desc: '"conectix" — Microsoft Virtual Hard Disk. The same footer signature also appears in the last 512 bytes. VHD is the v1 format (fixed/dynamic); VHDX is v2 with a different header and larger max size.',
    mime: 'application/x-vhd'
  },
  {
    name: 'VMDK (VMware Virtual Disk)',
    ext: '.vmdk',
    category: 'other',
    magic: [0x4B, 0x44, 0x4D, 0x56],
    offset: 0,
    desc: '"KDMV" — VMware Virtual Machine Disk, sparse extent. VMDK files appear small on disk while presenting a large virtual disk to the VM. Supported by VMware, VirtualBox, and QEMU with conversion.',
    mime: 'application/x-vmdk'
  },
  {
    name: 'VDI (VirtualBox Disk Image)',
    ext: '.vdi',
    category: 'other',
    magic: [0x3C, 0x3C, 0x3C, 0x20, 0x4F, 0x72, 0x61, 0x63, 0x6C, 0x65, 0x20, 0x56, 0x4D],
    offset: 0,
    desc: '"<<< Oracle VM" — VirtualBox native disk format. The human-readable header reflects its Sun/Oracle lineage. Supports dynamic allocation, snapshots, and live cloning without stopping the VM.',
    mime: 'application/x-virtualbox-vdi'
  },
  {
    name: 'QCOW2 (QEMU Disk Image)',
    ext: '.qcow2, .qcow',
    category: 'other',
    magic: [0x51, 0x46, 0x49, 0xFB],
    offset: 0,
    desc: '"QFI\\xFB" — QEMU Copy-On-Write v2. Native format for KVM/QEMU virtual machines. Supports snapshots, AES encryption, and copy-on-write at the cluster level. The standard disk format for Linux virtualization.',
    mime: 'application/x-qcow2'
  },
  {
    name: 'Flash SWF (uncompressed)',
    ext: '.swf',
    category: 'other',
    magic: [0x46, 0x57, 0x53],
    offset: 0,
    desc: '"FWS" — uncompressed Shockwave Flash. Byte 3 is the SWF version number. The format that powered web animation from ~1997 to 2017. Adobe officially killed Flash Player support on December 31, 2020.',
    mime: 'application/x-shockwave-flash'
  },
  {
    name: 'Flash SWF (zlib-compressed)',
    ext: '.swf',
    category: 'other',
    magic: [0x43, 0x57, 0x53],
    offset: 0,
    desc: '"CWS" — zlib-compressed SWF. The "C" replaces "F" to signal compression. Introduced in Flash Player 6. Bytes 4–7 hold the uncompressed size; everything from byte 8 onward is a raw zlib stream.',
    mime: 'application/x-shockwave-flash'
  },
  {
    name: 'Nintendo NES ROM',
    ext: '.nes',
    category: 'other',
    magic: [0x4E, 0x45, 0x53, 0x1A],
    offset: 0,
    desc: '"NES\\x1A" — iNES ROM format. The 0x1A is a DOS EOF marker to prevent text-mode display. Bytes 4–9 encode PRG-ROM bank count, CHR-ROM bank count, and the mapper type number.',
    mime: 'application/x-nes-rom'
  },
  {
    name: 'Game Boy / GBC ROM',
    ext: '.gb, .gbc',
    category: 'other',
    magic: [0xCE, 0xED, 0x66, 0x66],
    offset: 0x104,
    desc: 'Nintendo logo bitmap at offset 0x104. The Game Boy boot ROM verifies these exact bytes on startup — if they don\'t match, the console refuses to boot. Hardware-level DRM baked into silicon since 1989.',
    mime: 'application/x-gameboy-rom'
  },

];

window.SIGNATURE_COUNT = window.SIGNATURES.length;
