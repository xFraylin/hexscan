/**
 * HexScan — Signature Database
 * ─────────────────────────────
 * Each entry:
 *   name     {string}  Human-readable format name
 *   ext      {string}  Common extension(s), comma-separated
 *   category {string}  One of: images | documents | archives | executables |
 *                               audio | video | databases | crypto | text |
 *                               forensic | fonts | other
 *   magic    {number[]} Byte array to match (use null for wildcard byte)
 *   offset   {number}  Byte offset where match begins (default 0)
 *   desc     {string}  Short description
 *   mime     {string}  MIME type (optional)
 *
 * TO ADD YOUR OWN: just push a new object at the end of the array.
 * More specific signatures (longer magic arrays) are prioritized automatically.
 */

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
    desc: 'Joint Photographic Experts Group image. The most common lossy image format.',
    mime: 'image/jpeg'
  },
  {
    name: 'PNG',
    ext: '.png',
    category: 'images',
    magic: [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A],
    offset: 0,
    desc: 'Portable Network Graphics. Lossless, supports transparency.',
    mime: 'image/png'
  },
  {
    name: 'GIF87a',
    ext: '.gif',
    category: 'images',
    magic: [0x47, 0x49, 0x46, 0x38, 0x37, 0x61],
    offset: 0,
    desc: 'Graphics Interchange Format, version 87a.',
    mime: 'image/gif'
  },
  {
    name: 'GIF89a',
    ext: '.gif',
    category: 'images',
    magic: [0x47, 0x49, 0x46, 0x38, 0x39, 0x61],
    offset: 0,
    desc: 'Graphics Interchange Format, version 89a. Supports animation.',
    mime: 'image/gif'
  },
  {
    name: 'BMP',
    ext: '.bmp, .dib',
    category: 'images',
    magic: [0x42, 0x4D],
    offset: 0,
    desc: 'Windows Bitmap. Uncompressed raster graphics format.',
    mime: 'image/bmp'
  },
  {
    name: 'TIFF (little-endian)',
    ext: '.tif, .tiff',
    category: 'images',
    magic: [0x49, 0x49, 0x2A, 0x00],
    offset: 0,
    desc: 'Tagged Image File Format, little-endian (Intel byte order).',
    mime: 'image/tiff'
  },
  {
    name: 'TIFF (big-endian)',
    ext: '.tif, .tiff',
    category: 'images',
    magic: [0x4D, 0x4D, 0x00, 0x2A],
    offset: 0,
    desc: 'Tagged Image File Format, big-endian (Motorola byte order).',
    mime: 'image/tiff'
  },
  {
    name: 'ICO',
    ext: '.ico',
    category: 'images',
    magic: [0x00, 0x00, 0x01, 0x00],
    offset: 0,
    desc: 'Windows Icon format. Contains one or more small images.',
    mime: 'image/x-icon'
  },
  {
    name: 'WebP',
    ext: '.webp',
    category: 'images',
    magic: [0x52, 0x49, 0x46, 0x46, null, null, null, null, 0x57, 0x45, 0x42, 0x50],
    offset: 0,
    desc: 'Google WebP image format. Supports lossy/lossless and transparency.',
    mime: 'image/webp'
  },
  {
    name: 'HEIC/HEIF',
    ext: '.heic, .heif',
    category: 'images',
    magic: [0x66, 0x74, 0x79, 0x70, 0x68, 0x65, 0x69, 0x63],
    offset: 4,
    desc: 'High Efficiency Image Format. Used by Apple devices (iPhone photos).',
    mime: 'image/heic'
  },
  {
    name: 'AVIF',
    ext: '.avif',
    category: 'images',
    magic: [0x66, 0x74, 0x79, 0x70, 0x61, 0x76, 0x69, 0x66],
    offset: 4,
    desc: 'AV1 Image File Format. Next-gen format with excellent compression.',
    mime: 'image/avif'
  },
  {
    name: 'PSD (Photoshop)',
    ext: '.psd',
    category: 'images',
    magic: [0x38, 0x42, 0x50, 0x53],
    offset: 0,
    desc: 'Adobe Photoshop Document. Supports layers, masks, and effects.',
    mime: 'image/vnd.adobe.photoshop'
  },
  {
    name: 'SVG',
    ext: '.svg',
    category: 'images',
    magic: [0x3C, 0x73, 0x76, 0x67],
    offset: 0,
    desc: 'Scalable Vector Graphics. XML-based vector image format.',
    mime: 'image/svg+xml'
  },
  {
    name: 'XCF (GIMP)',
    ext: '.xcf',
    category: 'images',
    magic: [0x67, 0x69, 0x6D, 0x70, 0x20, 0x78, 0x63, 0x66],
    offset: 0,
    desc: 'GIMP native format. Supports layers and GIMP-specific data.',
    mime: 'image/x-xcf'
  },
  {
    name: 'PCX',
    ext: '.pcx',
    category: 'images',
    magic: [0x0A],
    offset: 0,
    desc: 'ZSoft PC Paintbrush bitmap format.',
    mime: 'image/x-pcx'
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
    desc: 'Portable Document Format. Fixed-layout document standard by Adobe.',
    mime: 'application/pdf'
  },
  {
    name: 'RTF',
    ext: '.rtf',
    category: 'documents',
    magic: [0x7B, 0x5C, 0x72, 0x74, 0x66],
    offset: 0,
    desc: 'Rich Text Format. Cross-platform document format.',
    mime: 'application/rtf'
  },
  {
    name: 'MS Office Legacy (DOC/XLS/PPT)',
    ext: '.doc, .xls, .ppt, .msi, .msg',
    category: 'documents',
    magic: [0xD0, 0xCF, 0x11, 0xE0, 0xA1, 0xB1, 0x1A, 0xE1],
    offset: 0,
    desc: 'Microsoft Compound Document (OLE2). Used by Office 97–2003 formats.',
    mime: 'application/msword'
  },
  {
    name: 'DOCX / XLSX / PPTX (Office Open XML)',
    ext: '.docx, .xlsx, .pptx, .odt, .epub',
    category: 'documents',
    magic: [0x50, 0x4B, 0x03, 0x04],
    offset: 0,
    desc: 'ZIP-based container. Used by Office 2007+, LibreOffice, and EPUB.',
    mime: 'application/zip',
    note: 'Distinguish DOCX/XLSX/PPTX/ODT/EPUB by inspecting the ZIP contents.'
  },
  {
    name: 'EPUB',
    ext: '.epub',
    category: 'documents',
    magic: [0x6D, 0x69, 0x6D, 0x65, 0x74, 0x79, 0x70, 0x65],
    offset: 30,
    desc: 'Electronic Publication. ZIP-based e-book format.',
    mime: 'application/epub+zip'
  },
  {
    name: 'DjVu',
    ext: '.djvu',
    category: 'documents',
    magic: [0x41, 0x54, 0x26, 0x54, 0x46, 0x4F, 0x52, 0x4D],
    offset: 0,
    desc: 'DjVu compressed document. Common for scanned documents.',
    mime: 'image/vnd.djvu'
  },

  // ══════════════════════════════════════════════════
  // ARCHIVES / COMPRESSED
  // ══════════════════════════════════════════════════
  {
    name: 'ZIP',
    ext: '.zip, .jar, .apk, .docx, .xlsx',
    category: 'archives',
    magic: [0x50, 0x4B, 0x03, 0x04],
    offset: 0,
    desc: 'ZIP archive. Widely used container format with optional compression.',
    mime: 'application/zip'
  },
  {
    name: 'ZIP (empty/spanned)',
    ext: '.zip',
    category: 'archives',
    magic: [0x50, 0x4B, 0x05, 0x06],
    offset: 0,
    desc: 'ZIP archive (empty or end of central directory).',
    mime: 'application/zip'
  },
  {
    name: 'RAR v1.5–4',
    ext: '.rar',
    category: 'archives',
    magic: [0x52, 0x61, 0x72, 0x21, 0x1A, 0x07, 0x00],
    offset: 0,
    desc: 'Roshal Archive (RAR), versions 1.5 to 4.',
    mime: 'application/x-rar-compressed'
  },
  {
    name: 'RAR v5+',
    ext: '.rar',
    category: 'archives',
    magic: [0x52, 0x61, 0x72, 0x21, 0x1A, 0x07, 0x01, 0x00],
    offset: 0,
    desc: 'Roshal Archive (RAR), version 5 and later.',
    mime: 'application/x-rar-compressed'
  },
  {
    name: '7-Zip',
    ext: '.7z',
    category: 'archives',
    magic: [0x37, 0x7A, 0xBC, 0xAF, 0x27, 0x1C],
    offset: 0,
    desc: '7-Zip archive. High compression ratio format.',
    mime: 'application/x-7z-compressed'
  },
  {
    name: 'GZIP',
    ext: '.gz, .tgz',
    category: 'archives',
    magic: [0x1F, 0x8B],
    offset: 0,
    desc: 'GNU Zip compression. Single-file compressor, often wraps TAR.',
    mime: 'application/gzip'
  },
  {
    name: 'BZIP2',
    ext: '.bz2',
    category: 'archives',
    magic: [0x42, 0x5A, 0x68],
    offset: 0,
    desc: 'Block-sorting compression by Julian Seward.',
    mime: 'application/x-bzip2'
  },
  {
    name: 'XZ',
    ext: '.xz',
    category: 'archives',
    magic: [0xFD, 0x37, 0x7A, 0x58, 0x5A, 0x00],
    offset: 0,
    desc: 'LZMA2-based compression. Common in Linux package distributions.',
    mime: 'application/x-xz'
  },
  {
    name: 'ZSTD',
    ext: '.zst',
    category: 'archives',
    magic: [0x28, 0xB5, 0x2F, 0xFD],
    offset: 0,
    desc: 'Zstandard compression by Facebook. Fast with high ratios.',
    mime: 'application/zstd'
  },
  {
    name: 'LZ4',
    ext: '.lz4',
    category: 'archives',
    magic: [0x04, 0x22, 0x4D, 0x18],
    offset: 0,
    desc: 'LZ4 frame format. Extremely fast compression.',
    mime: 'application/x-lz4'
  },
  {
    name: 'TAR',
    ext: '.tar',
    category: 'archives',
    magic: [0x75, 0x73, 0x74, 0x61, 0x72],
    offset: 257,
    desc: 'POSIX Tape Archive. Uncompressed Unix archive format.',
    mime: 'application/x-tar'
  },
  {
    name: 'ISO 9660 (CD/DVD image)',
    ext: '.iso',
    category: 'archives',
    magic: [0x43, 0x44, 0x30, 0x30, 0x31],
    offset: 32769,
    desc: 'ISO 9660 CD/DVD filesystem image.',
    mime: 'application/x-iso9660-image'
  },
  {
    name: 'DMG (Apple Disk Image)',
    ext: '.dmg',
    category: 'archives',
    magic: [0x78, 0x01, 0x73, 0x0D, 0x62, 0x62, 0x60],
    offset: 0,
    desc: 'Apple Disk Image. macOS software distribution format.',
    mime: 'application/x-apple-diskimage'
  },
  {
    name: 'CAB (Cabinet)',
    ext: '.cab',
    category: 'archives',
    magic: [0x4D, 0x53, 0x43, 0x46],
    offset: 0,
    desc: 'Microsoft Cabinet archive. Used in Windows software distribution.',
    mime: 'application/vnd.ms-cab-compressed'
  },
  {
    name: 'ARJ',
    ext: '.arj',
    category: 'archives',
    magic: [0x60, 0xEA],
    offset: 0,
    desc: 'ARJ Archive. Popular compression format from the early 1990s.',
    mime: 'application/x-arj'
  },
  {
    name: 'LZH / LHA',
    ext: '.lzh, .lha',
    category: 'archives',
    magic: [0x2D, 0x6C, 0x68],
    offset: 2,
    desc: 'LHA/LZH compression. Popular in Japan and older systems.',
    mime: 'application/x-lzh-compressed'
  },
  {
    name: 'LZMA',
    ext: '.lzma',
    category: 'archives',
    magic: [0x5D, 0x00, 0x00],
    offset: 0,
    desc: 'Lempel-Ziv-Markov chain algorithm compression.',
    mime: 'application/x-lzma'
  },
  {
    name: 'Deflate (zlib)',
    ext: '.zz, .zlib',
    category: 'archives',
    magic: [0x78, 0x9C],
    offset: 0,
    desc: 'Zlib-compressed data (deflate). Common in network protocols.',
    mime: 'application/zlib'
  },
  {
    name: 'WIM (Windows Imaging)',
    ext: '.wim, .swm, .esd',
    category: 'archives',
    magic: [0x4D, 0x53, 0x57, 0x49, 0x4D, 0x00, 0x00, 0x00],
    offset: 0,
    desc: 'Windows Imaging Format. Used by Windows installation media.',
    mime: 'application/x-ms-wim'
  },

  // ══════════════════════════════════════════════════
  // EXECUTABLES
  // ══════════════════════════════════════════════════
  {
    name: 'PE (EXE/DLL/SYS)',
    ext: '.exe, .dll, .sys, .scr, .drv',
    category: 'executables',
    magic: [0x4D, 0x5A],
    offset: 0,
    desc: 'Portable Executable (Windows). MZ header marks all PE binaries.',
    mime: 'application/x-msdownload'
  },
  {
    name: 'ELF (Linux/Unix executable)',
    ext: '.elf, .so, .ko',
    category: 'executables',
    magic: [0x7F, 0x45, 0x4C, 0x46],
    offset: 0,
    desc: 'Executable and Linkable Format. Standard for Linux, Android, and many Unix systems.',
    mime: 'application/x-elf'
  },
  {
    name: 'Mach-O (macOS 32-bit)',
    ext: '.macho, .dylib',
    category: 'executables',
    magic: [0xCE, 0xFA, 0xED, 0xFE],
    offset: 0,
    desc: 'Mach Object file format, 32-bit little-endian (macOS/iOS).',
    mime: 'application/x-mach-binary'
  },
  {
    name: 'Mach-O (macOS 64-bit)',
    ext: '.macho, .dylib',
    category: 'executables',
    magic: [0xCF, 0xFA, 0xED, 0xFE],
    offset: 0,
    desc: 'Mach Object file format, 64-bit little-endian (macOS/iOS).',
    mime: 'application/x-mach-binary'
  },
  {
    name: 'Mach-O Fat Binary',
    ext: '.macho',
    category: 'executables',
    magic: [0xCA, 0xFE, 0xBA, 0xBE],
    offset: 0,
    desc: 'Universal/Fat binary. Contains multiple architectures in one file.',
    mime: 'application/x-mach-binary'
  },
  {
    name: 'Java CLASS',
    ext: '.class',
    category: 'executables',
    magic: [0xCA, 0xFE, 0xBA, 0xBE],
    offset: 0,
    desc: 'Java bytecode class file. Executed by the Java Virtual Machine.',
    mime: 'application/java-vm'
  },
  {
    name: 'DEX (Android bytecode)',
    ext: '.dex',
    category: 'executables',
    magic: [0x64, 0x65, 0x78, 0x0A, 0x30, 0x33, 0x35, 0x00],
    offset: 0,
    desc: 'Dalvik Executable. Android app bytecode format.',
    mime: 'application/vnd.android.dex'
  },
  {
    name: 'WASM (WebAssembly)',
    ext: '.wasm',
    category: 'executables',
    magic: [0x00, 0x61, 0x73, 0x6D],
    offset: 0,
    desc: 'WebAssembly binary module.',
    mime: 'application/wasm'
  },
  {
    name: 'COM (DOS Executable)',
    ext: '.com',
    category: 'executables',
    magic: [0xEB],
    offset: 0,
    desc: 'MS-DOS .COM executable. Simple flat binary format.',
    mime: 'application/x-msdos-program'
  },
  {
    name: 'NE (16-bit Windows)',
    ext: '.exe, .dll',
    category: 'executables',
    magic: [0x4E, 0x45],
    offset: 0,
    desc: 'New Executable format. 16-bit Windows 3.x binaries.',
    mime: 'application/x-ne-executable'
  },
  {
    name: 'Python Bytecode (.pyc)',
    ext: '.pyc',
    category: 'executables',
    magic: [0x55, 0x0D, 0x0D, 0x0A],
    offset: 0,
    desc: 'Python compiled bytecode (Python 3.x).',
    mime: 'application/x-python-bytecode'
  },

  // ══════════════════════════════════════════════════
  // AUDIO
  // ══════════════════════════════════════════════════
  {
    name: 'MP3 (ID3v2)',
    ext: '.mp3',
    category: 'audio',
    magic: [0x49, 0x44, 0x33],
    offset: 0,
    desc: 'MPEG Layer 3 audio with ID3v2 metadata tag.',
    mime: 'audio/mpeg'
  },
  {
    name: 'MP3 (no ID3)',
    ext: '.mp3',
    category: 'audio',
    magic: [0xFF, 0xFB],
    offset: 0,
    desc: 'MPEG Layer 3 audio without ID3 tag (starts at frame sync).',
    mime: 'audio/mpeg'
  },
  {
    name: 'WAV (RIFF)',
    ext: '.wav',
    category: 'audio',
    magic: [0x52, 0x49, 0x46, 0x46, null, null, null, null, 0x57, 0x41, 0x56, 0x45],
    offset: 0,
    desc: 'Waveform Audio File. Uncompressed PCM audio.',
    mime: 'audio/wav'
  },
  {
    name: 'FLAC',
    ext: '.flac',
    category: 'audio',
    magic: [0x66, 0x4C, 0x61, 0x43],
    offset: 0,
    desc: 'Free Lossless Audio Codec. Lossless compression, audiophile favorite.',
    mime: 'audio/flac'
  },
  {
    name: 'OGG (Vorbis/Opus/FLAC)',
    ext: '.ogg, .oga, .opus',
    category: 'audio',
    magic: [0x4F, 0x67, 0x67, 0x53],
    offset: 0,
    desc: 'Ogg container format. Commonly holds Vorbis or Opus audio.',
    mime: 'audio/ogg'
  },
  {
    name: 'MIDI',
    ext: '.mid, .midi',
    category: 'audio',
    magic: [0x4D, 0x54, 0x68, 0x64],
    offset: 0,
    desc: 'Musical Instrument Digital Interface. Event-based music format.',
    mime: 'audio/midi'
  },
  {
    name: 'AIFF',
    ext: '.aiff, .aif',
    category: 'audio',
    magic: [0x46, 0x4F, 0x52, 0x4D, null, null, null, null, 0x41, 0x49, 0x46, 0x46],
    offset: 0,
    desc: 'Audio Interchange File Format. Apple/Mac high-quality audio.',
    mime: 'audio/aiff'
  },
  {
    name: 'AAC (ADTS)',
    ext: '.aac',
    category: 'audio',
    magic: [0xFF, 0xF1],
    offset: 0,
    desc: 'Advanced Audio Coding. MPEG-4 audio compression standard.',
    mime: 'audio/aac'
  },
  {
    name: 'M4A / AAC (MP4 audio)',
    ext: '.m4a',
    category: 'audio',
    magic: [0x66, 0x74, 0x79, 0x70, 0x4D, 0x34, 0x41, 0x20],
    offset: 4,
    desc: 'MPEG-4 audio container (AAC). Used by iTunes and Apple devices.',
    mime: 'audio/mp4'
  },
  {
    name: 'WMA (Windows Media Audio)',
    ext: '.wma, .wmv, .asf',
    category: 'audio',
    magic: [0x30, 0x26, 0xB2, 0x75, 0x8E, 0x66, 0xCF, 0x11],
    offset: 0,
    desc: 'Advanced Systems Format (ASF). Contains WMA/WMV data.',
    mime: 'audio/x-ms-wma'
  },
  {
    name: 'AU (Sun audio)',
    ext: '.au, .snd',
    category: 'audio',
    magic: [0x2E, 0x73, 0x6E, 0x64],
    offset: 0,
    desc: 'Sun/NeXT audio format. Legacy Unix audio standard.',
    mime: 'audio/basic'
  },

  // ══════════════════════════════════════════════════
  // VIDEO
  // ══════════════════════════════════════════════════
  {
    name: 'MP4 / M4V / MOV (ftyp)',
    ext: '.mp4, .m4v, .mov, .3gp',
    category: 'video',
    magic: [0x66, 0x74, 0x79, 0x70],
    offset: 4,
    desc: 'MPEG-4 Part 14 container. Most common video format today.',
    mime: 'video/mp4'
  },
  {
    name: 'MOV (QuickTime)',
    ext: '.mov, .qt',
    category: 'video',
    magic: [0x6D, 0x6F, 0x6F, 0x76],
    offset: 4,
    desc: 'QuickTime Movie. Apple container for video and audio.',
    mime: 'video/quicktime'
  },
  {
    name: 'AVI (RIFF)',
    ext: '.avi',
    category: 'video',
    magic: [0x52, 0x49, 0x46, 0x46, null, null, null, null, 0x41, 0x56, 0x49, 0x20],
    offset: 0,
    desc: 'Audio Video Interleave. Microsoft multimedia container.',
    mime: 'video/x-msvideo'
  },
  {
    name: 'MKV (Matroska)',
    ext: '.mkv, .webm, .mka',
    category: 'video',
    magic: [0x1A, 0x45, 0xDF, 0xA3],
    offset: 0,
    desc: 'Matroska video container. Open standard, supports multiple tracks.',
    mime: 'video/x-matroska'
  },
  {
    name: 'FLV (Flash Video)',
    ext: '.flv',
    category: 'video',
    magic: [0x46, 0x4C, 0x56, 0x01],
    offset: 0,
    desc: 'Flash Video. Legacy streaming format from Adobe Flash era.',
    mime: 'video/x-flv'
  },
  {
    name: 'MPEG-1/2 Video',
    ext: '.mpg, .mpeg, .m2v',
    category: 'video',
    magic: [0x00, 0x00, 0x01, 0xBA],
    offset: 0,
    desc: 'MPEG Program Stream. Legacy video standard for DVD and broadcast.',
    mime: 'video/mpeg'
  },
  {
    name: 'MPEG Transport Stream',
    ext: '.ts, .m2ts, .mts',
    category: 'video',
    magic: [0x47],
    offset: 0,
    desc: 'MPEG-2 Transport Stream. Used for broadcast TV and Blu-ray.',
    mime: 'video/mp2t'
  },
  {
    name: '3GP / 3G2',
    ext: '.3gp, .3g2',
    category: 'video',
    magic: [0x66, 0x74, 0x79, 0x70, 0x33, 0x67],
    offset: 4,
    desc: '3GPP multimedia container. Mobile phone video standard.',
    mime: 'video/3gpp'
  },
  {
    name: 'RealMedia',
    ext: '.rm, .rmvb',
    category: 'video',
    magic: [0x2E, 0x52, 0x4D, 0x46],
    offset: 0,
    desc: 'RealMedia container. Legacy streaming video format.',
    mime: 'application/vnd.rn-realmedia'
  },

  // ══════════════════════════════════════════════════
  // DATABASES
  // ══════════════════════════════════════════════════
  {
    name: 'SQLite',
    ext: '.sqlite, .db, .db3, .s3db',
    category: 'databases',
    magic: [0x53, 0x51, 0x4C, 0x69, 0x74, 0x65, 0x20, 0x66, 0x6F, 0x72, 0x6D, 0x61, 0x74, 0x20, 0x33, 0x00],
    offset: 0,
    desc: 'SQLite database file. Self-contained, serverless SQL engine.',
    mime: 'application/x-sqlite3'
  },
  {
    name: 'MS Access (MDB)',
    ext: '.mdb',
    category: 'databases',
    magic: [0x00, 0x01, 0x00, 0x00, 0x53, 0x74, 0x61, 0x6E, 0x64, 0x61, 0x72, 0x64, 0x20, 0x4A, 0x65, 0x74],
    offset: 0,
    desc: 'Microsoft Access 97–2003 database.',
    mime: 'application/msaccess'
  },
  {
    name: 'MS Access (ACCDB)',
    ext: '.accdb',
    category: 'databases',
    magic: [0x00, 0x01, 0x00, 0x00, 0x53, 0x74, 0x61, 0x6E, 0x64, 0x61, 0x72, 0x64, 0x20, 0x41, 0x43, 0x45],
    offset: 0,
    desc: 'Microsoft Access 2007+ database (.accdb format).',
    mime: 'application/msaccess'
  },
  {
    name: 'DBF (dBASE)',
    ext: '.dbf',
    category: 'databases',
    magic: [0x03],
    offset: 0,
    desc: 'dBASE III database. Used by legacy systems and some GIS software.',
    mime: 'application/dbase'
  },
  {
    name: 'MySQL Table Definition',
    ext: '.frm',
    category: 'databases',
    magic: [0xFE, 0x01],
    offset: 0,
    desc: 'MySQL table definition file.',
    mime: 'application/x-mysql'
  },
  {
    name: 'Berkeley DB',
    ext: '.db',
    category: 'databases',
    magic: [0x00, 0x06, 0x15, 0x61],
    offset: 0,
    desc: 'Oracle Berkeley DB key-value store.',
    mime: 'application/x-berkeley-db'
  },

  // ══════════════════════════════════════════════════
  // CRYPTO / CERTIFICATES / KEYS
  // ══════════════════════════════════════════════════
  {
    name: 'PEM Certificate/Key',
    ext: '.pem, .crt, .cer, .key',
    category: 'crypto',
    magic: [0x2D, 0x2D, 0x2D, 0x2D, 0x2D, 0x42, 0x45, 0x47, 0x49, 0x4E],
    offset: 0,
    desc: 'Privacy-Enhanced Mail. Base64-encoded DER with ASCII armor.',
    mime: 'application/x-pem-file'
  },
  {
    name: 'DER Certificate',
    ext: '.der, .cer',
    category: 'crypto',
    magic: [0x30, 0x82],
    offset: 0,
    desc: 'DER-encoded X.509 certificate. Binary ASN.1 encoding.',
    mime: 'application/x-x509-ca-cert'
  },
  {
    name: 'PFX / PKCS#12',
    ext: '.pfx, .p12',
    category: 'crypto',
    magic: [0x30, 0x82],
    offset: 0,
    desc: 'PKCS#12 / PFX archive. Contains cert + private key bundle.',
    mime: 'application/x-pkcs12'
  },
  {
    name: 'GPG/PGP (binary keyring)',
    ext: '.gpg, .pgp',
    category: 'crypto',
    magic: [0x99],
    offset: 0,
    desc: 'OpenPGP binary keyring or encrypted message.',
    mime: 'application/pgp-encrypted'
  },
  {
    name: 'GPG/PGP (ASCII armored)',
    ext: '.asc',
    category: 'crypto',
    magic: [0x2D, 0x2D, 0x2D, 0x2D, 0x2D, 0x42, 0x45, 0x47, 0x49, 0x4E, 0x20, 0x50, 0x47, 0x50],
    offset: 0,
    desc: 'OpenPGP ASCII-armored message or key.',
    mime: 'application/pgp-signature'
  },
  {
    name: 'SSH Private Key (OpenSSH)',
    ext: '.pem, .key',
    category: 'crypto',
    magic: [0x2D, 0x2D, 0x2D, 0x2D, 0x2D, 0x42, 0x45, 0x47, 0x49, 0x4E, 0x20, 0x4F, 0x50, 0x45, 0x4E, 0x53, 0x53, 0x48],
    offset: 0,
    desc: 'OpenSSH private key file (newer format).',
    mime: 'application/x-pem-file'
  },
  {
    name: 'Java Keystore (JKS)',
    ext: '.jks, .keystore',
    category: 'crypto',
    magic: [0xFE, 0xED, 0xFE, 0xED],
    offset: 0,
    desc: 'Java KeyStore. Stores cryptographic keys and certificates.',
    mime: 'application/x-java-keystore'
  },

  // ══════════════════════════════════════════════════
  // TEXT / CONFIG / CODE (signature-detectable)
  // ══════════════════════════════════════════════════
  {
    name: 'UTF-8 BOM',
    ext: '.txt, .html, .xml, .csv',
    category: 'text',
    magic: [0xEF, 0xBB, 0xBF],
    offset: 0,
    desc: 'UTF-8 encoded text with Byte Order Mark.',
    mime: 'text/plain'
  },
  {
    name: 'UTF-16 LE BOM',
    ext: '.txt, .xml',
    category: 'text',
    magic: [0xFF, 0xFE],
    offset: 0,
    desc: 'UTF-16 Little-Endian text with BOM.',
    mime: 'text/plain'
  },
  {
    name: 'UTF-16 BE BOM',
    ext: '.txt, .xml',
    category: 'text',
    magic: [0xFE, 0xFF],
    offset: 0,
    desc: 'UTF-16 Big-Endian text with BOM.',
    mime: 'text/plain'
  },
  {
    name: 'UTF-32 LE BOM',
    ext: '.txt',
    category: 'text',
    magic: [0xFF, 0xFE, 0x00, 0x00],
    offset: 0,
    desc: 'UTF-32 Little-Endian text with BOM.',
    mime: 'text/plain'
  },
  {
    name: 'XML',
    ext: '.xml, .svg, .xhtml, .xsd',
    category: 'text',
    magic: [0x3C, 0x3F, 0x78, 0x6D, 0x6C],
    offset: 0,
    desc: 'eXtensible Markup Language document.',
    mime: 'application/xml'
  },
  {
    name: 'HTML',
    ext: '.html, .htm',
    category: 'text',
    magic: [0x3C, 0x21, 0x44, 0x4F, 0x43, 0x54, 0x59, 0x50, 0x45],
    offset: 0,
    desc: 'HTML document with DOCTYPE declaration.',
    mime: 'text/html'
  },
  {
    name: 'JSON',
    ext: '.json',
    category: 'text',
    magic: [0x7B, 0x0A],
    offset: 0,
    desc: 'JavaScript Object Notation data file.',
    mime: 'application/json'
  },
  {
    name: 'Shebang Script (Unix)',
    ext: '.sh, .py, .rb, .pl',
    category: 'text',
    magic: [0x23, 0x21],
    offset: 0,
    desc: 'Unix script with shebang (#!) interpreter line.',
    mime: 'text/x-shellscript'
  },
  {
    name: 'Windows Registry Hive',
    ext: '.hiv, .dat, .ntuser.dat',
    category: 'other',
    magic: [0x72, 0x65, 0x67, 0x66],
    offset: 0,
    desc: 'Windows Registry Hive file. Contains registry key/value data.',
    mime: 'application/octet-stream'
  },
  {
    name: 'Windows Batch Script',
    ext: '.bat, .cmd',
    category: 'text',
    magic: [0x40, 0x65, 0x63, 0x68, 0x6F],
    offset: 0,
    desc: 'Windows batch script starting with @echo.',
    mime: 'text/x-batch'
  },
  {
    name: 'PowerShell Script',
    ext: '.ps1',
    category: 'text',
    magic: [0x23, 0x20],
    offset: 0,
    desc: 'PowerShell script (comment-prefixed).',
    mime: 'text/x-powershell'
  },

  // ══════════════════════════════════════════════════
  // FORENSIC / MEMORY / NETWORK
  // ══════════════════════════════════════════════════
  {
    name: 'PCAP (Wireshark capture)',
    ext: '.pcap, .cap',
    category: 'forensic',
    magic: [0xD4, 0xC3, 0xB2, 0xA1],
    offset: 0,
    desc: 'Packet Capture file. Network traffic dump from Wireshark/tcpdump.',
    mime: 'application/vnd.tcpdump.pcap'
  },
  {
    name: 'PCAP (big-endian)',
    ext: '.pcap',
    category: 'forensic',
    magic: [0xA1, 0xB2, 0xC3, 0xD4],
    offset: 0,
    desc: 'PCAP network capture, big-endian byte order.',
    mime: 'application/vnd.tcpdump.pcap'
  },
  {
    name: 'PCAPNG (next-generation)',
    ext: '.pcapng',
    category: 'forensic',
    magic: [0x0A, 0x0D, 0x0D, 0x0A],
    offset: 0,
    desc: 'PCAP Next Generation. Enhanced network capture format.',
    mime: 'application/vnd.tcpdump.pcap'
  },
  {
    name: 'Windows Event Log (EVTX)',
    ext: '.evtx',
    category: 'forensic',
    magic: [0x45, 0x6C, 0x66, 0x46, 0x69, 0x6C, 0x65, 0x00],
    offset: 0,
    desc: 'Windows XML Event Log. Vista+ event log format.',
    mime: 'application/x-ms-evtx'
  },
  {
    name: 'Windows Event Log (EVT)',
    ext: '.evt',
    category: 'forensic',
    magic: [0x30, 0x00, 0x00, 0x00, 0x4C, 0x66, 0x4C, 0x65],
    offset: 0,
    desc: 'Windows legacy Event Log (XP and earlier).',
    mime: 'application/x-ms-evt'
  },
  {
    name: 'Windows Shortcut (LNK)',
    ext: '.lnk',
    category: 'forensic',
    magic: [0x4C, 0x00, 0x00, 0x00, 0x01, 0x14, 0x02, 0x00],
    offset: 0,
    desc: 'Windows Shell Link (shortcut). Contains target path and metadata.',
    mime: 'application/x-ms-shortcut'
  },
  {
    name: 'E01 (EnCase Evidence)',
    ext: '.e01, .ex01',
    category: 'forensic',
    magic: [0x45, 0x56, 0x46, 0x09, 0x0D, 0x0A, 0xFF, 0x00],
    offset: 0,
    desc: 'EnCase Evidence File. Forensic disk image format.',
    mime: 'application/x-encase'
  },
  {
    name: 'AFF (Advanced Forensic Format)',
    ext: '.aff',
    category: 'forensic',
    magic: [0x41, 0x46, 0x46],
    offset: 0,
    desc: 'Advanced Forensic Format. Open-source forensic disk image.',
    mime: 'application/x-aff'
  },
  {
    name: 'Volatility Memory Dump',
    ext: '.raw, .mem, .dmp',
    category: 'forensic',
    magic: [0x50, 0x41, 0x47, 0x45, 0x44, 0x55, 0x4D, 0x50],
    offset: 0,
    desc: 'Windows crash dump / memory image file.',
    mime: 'application/octet-stream'
  },
  {
    name: 'Prefetch (Windows)',
    ext: '.pf',
    category: 'forensic',
    magic: [0x53, 0x43, 0x43, 0x41],
    offset: 4,
    desc: 'Windows Prefetch file. Contains execution traces of programs.',
    mime: 'application/x-ms-prefetch'
  },
  {
    name: 'Windows Thumbnail Cache',
    ext: '.db',
    category: 'forensic',
    magic: [0x43, 0x4D, 0x4D, 0x4D],
    offset: 0,
    desc: 'Windows Thumbs.db thumbnail cache file.',
    mime: 'application/octet-stream'
  },

  // ══════════════════════════════════════════════════
  // FONTS
  // ══════════════════════════════════════════════════
  {
    name: 'TTF (TrueType Font)',
    ext: '.ttf',
    category: 'fonts',
    magic: [0x00, 0x01, 0x00, 0x00, 0x00],
    offset: 0,
    desc: 'TrueType Font. Scalable outline font standard.',
    mime: 'font/ttf'
  },
  {
    name: 'OTF (OpenType Font)',
    ext: '.otf',
    category: 'fonts',
    magic: [0x4F, 0x54, 0x54, 0x4F],
    offset: 0,
    desc: 'OpenType Font. Advanced scalable font format.',
    mime: 'font/otf'
  },
  {
    name: 'WOFF',
    ext: '.woff',
    category: 'fonts',
    magic: [0x77, 0x4F, 0x46, 0x46],
    offset: 0,
    desc: 'Web Open Font Format. Compressed font for web use.',
    mime: 'font/woff'
  },
  {
    name: 'WOFF2',
    ext: '.woff2',
    category: 'fonts',
    magic: [0x77, 0x4F, 0x46, 0x32],
    offset: 0,
    desc: 'Web Open Font Format 2. Better compression than WOFF.',
    mime: 'font/woff2'
  },
  {
    name: 'EOT (Embedded OpenType)',
    ext: '.eot',
    category: 'fonts',
    magic: [0x4C, 0x50],
    offset: 8,
    desc: 'Embedded OpenType font. Legacy IE web font format.',
    mime: 'application/vnd.ms-fontobject'
  },
  {
    name: 'PFB (PostScript Font)',
    ext: '.pfb',
    category: 'fonts',
    magic: [0x80, 0x01],
    offset: 0,
    desc: 'PostScript Type 1 binary font.',
    mime: 'application/x-font-pfb'
  },

  // ══════════════════════════════════════════════════
  // OTHER COMMON FORMATS
  // ══════════════════════════════════════════════════
  {
    name: 'BitTorrent',
    ext: '.torrent',
    category: 'other',
    magic: [0x64, 0x38, 0x3A, 0x61, 0x6E, 0x6E, 0x6F, 0x75, 0x6E, 0x63, 0x65],
    offset: 0,
    desc: 'BitTorrent metainfo file. Contains tracker URL and file hashes.',
    mime: 'application/x-bittorrent'
  },
  {
    name: 'Outlook PST',
    ext: '.pst',
    category: 'other',
    magic: [0x21, 0x42, 0x44, 0x4E],
    offset: 0,
    desc: 'Microsoft Outlook Personal Storage Table. Email/calendar archive.',
    mime: 'application/vnd.ms-outlook'
  },
  {
    name: 'Outlook OST',
    ext: '.ost',
    category: 'other',
    magic: [0x21, 0x42, 0x44, 0x4E],
    offset: 0,
    desc: 'Microsoft Outlook Offline Storage Table. Local email cache.',
    mime: 'application/vnd.ms-outlook'
  },
  {
    name: 'Mbox (email archive)',
    ext: '.mbox, .mbx',
    category: 'other',
    magic: [0x46, 0x72, 0x6F, 0x6D, 0x20, 0x20],
    offset: 0,
    desc: 'Unix mbox mailbox format. Concatenated email messages.',
    mime: 'application/mbox'
  },
  {
    name: 'EML (email message)',
    ext: '.eml',
    category: 'other',
    magic: [0x52, 0x65, 0x74, 0x75, 0x72, 0x6E, 0x2D, 0x50, 0x61, 0x74, 0x68],
    offset: 0,
    desc: 'RFC 822 email message file.',
    mime: 'message/rfc822'
  },
  {
    name: 'Virtual Disk (VHD)',
    ext: '.vhd',
    category: 'other',
    magic: [0x63, 0x6F, 0x6E, 0x65, 0x63, 0x74, 0x69, 0x78],
    offset: 0,
    desc: 'Microsoft Virtual Hard Disk image.',
    mime: 'application/x-vhd'
  },
  {
    name: 'Virtual Disk (VMDK)',
    ext: '.vmdk',
    category: 'other',
    magic: [0x4B, 0x44, 0x4D, 0x56],
    offset: 0,
    desc: 'VMware Virtual Machine Disk image.',
    mime: 'application/x-vmdk'
  },
  {
    name: 'VirtualBox Disk (VDI)',
    ext: '.vdi',
    category: 'other',
    magic: [0x3C, 0x3C, 0x3C, 0x20, 0x4F, 0x72, 0x61, 0x63, 0x6C, 0x65, 0x20, 0x56, 0x4D],
    offset: 0,
    desc: 'VirtualBox Disk Image.',
    mime: 'application/x-virtualbox-vdi'
  },
  {
    name: 'Mach-O Big-endian (BE)',
    ext: '.macho',
    category: 'executables',
    magic: [0xFE, 0xED, 0xFA, 0xCE],
    offset: 0,
    desc: 'Mach-O 32-bit big-endian binary.',
    mime: 'application/x-mach-binary'
  },
  {
    name: 'Mach-O 64-bit BE',
    ext: '.macho',
    category: 'executables',
    magic: [0xFE, 0xED, 0xFA, 0xCF],
    offset: 0,
    desc: 'Mach-O 64-bit big-endian binary.',
    mime: 'application/x-mach-binary'
  },
  {
    name: 'Flash SWF',
    ext: '.swf',
    category: 'other',
    magic: [0x46, 0x57, 0x53],
    offset: 0,
    desc: 'Adobe Flash SWF (uncompressed).',
    mime: 'application/x-shockwave-flash'
  },
  {
    name: 'Flash SWF (compressed)',
    ext: '.swf',
    category: 'other',
    magic: [0x43, 0x57, 0x53],
    offset: 0,
    desc: 'Adobe Flash SWF (zlib compressed).',
    mime: 'application/x-shockwave-flash'
  },
  {
    name: 'Nintendo ROM (NES)',
    ext: '.nes',
    category: 'other',
    magic: [0x4E, 0x45, 0x53, 0x1A],
    offset: 0,
    desc: 'Nintendo Entertainment System ROM image.',
    mime: 'application/x-nes-rom'
  },
  {
    name: 'Game Boy ROM',
    ext: '.gb, .gbc',
    category: 'other',
    magic: [0xCE, 0xED, 0x66, 0x66],
    offset: 0x104,
    desc: 'Nintendo Game Boy / Game Boy Color ROM.',
    mime: 'application/x-gameboy-rom'
  },
  {
    name: 'Matroska / WebM (EBML)',
    ext: '.mkv, .webm',
    category: 'video',
    magic: [0x1A, 0x45, 0xDF, 0xA3],
    offset: 0,
    desc: 'EBML container (Matroska/WebM). Modern open video format.',
    mime: 'video/webm'
  },
  {
    name: 'Windows Crash Dump (DMP)',
    ext: '.dmp, .mdmp',
    category: 'forensic',
    magic: [0x4D, 0x44, 0x4D, 0x50, 0x93, 0xA7],
    offset: 0,
    desc: 'Windows memory crash dump (minidump format).',
    mime: 'application/x-dmp'
  },
  {
    name: 'Java Archive (JAR)',
    ext: '.jar',
    category: 'executables',
    magic: [0x50, 0x4B, 0x03, 0x04],
    offset: 0,
    desc: 'Java Archive (ZIP-based). Contains Java class files and resources.',
    mime: 'application/java-archive'
  },
  {
    name: 'Android APK',
    ext: '.apk',
    category: 'executables',
    magic: [0x50, 0x4B, 0x03, 0x04],
    offset: 0,
    desc: 'Android Package (ZIP-based). Contains app DEX, resources, and manifest.',
    mime: 'application/vnd.android.package-archive'
  },
  {
    name: 'MSI (Windows Installer)',
    ext: '.msi',
    category: 'executables',
    magic: [0xD0, 0xCF, 0x11, 0xE0, 0xA1, 0xB1, 0x1A, 0xE1],
    offset: 0,
    desc: 'Windows Installer package (OLE2-based).',
    mime: 'application/x-msi'
  },
  {
    name: 'Outlook MSG',
    ext: '.msg',
    category: 'other',
    magic: [0xD0, 0xCF, 0x11, 0xE0, 0xA1, 0xB1, 0x1A, 0xE1],
    offset: 0,
    desc: 'Outlook Message (OLE2-based). Email in Microsoft Outlook format.',
    mime: 'application/vnd.ms-outlook'
  },
  {
    name: 'OpenDocument Text (ODT)',
    ext: '.odt',
    category: 'documents',
    magic: [0x50, 0x4B, 0x03, 0x04],
    offset: 0,
    desc: 'OpenDocument Text. LibreOffice/OpenOffice writer format.',
    mime: 'application/vnd.oasis.opendocument.text'
  },
  {
    name: 'OpenDocument Spreadsheet (ODS)',
    ext: '.ods',
    category: 'documents',
    magic: [0x50, 0x4B, 0x03, 0x04],
    offset: 0,
    desc: 'OpenDocument Spreadsheet. LibreOffice Calc format.',
    mime: 'application/vnd.oasis.opendocument.spreadsheet'
  },
  {
    name: 'OpenDocument Presentation (ODP)',
    ext: '.odp',
    category: 'documents',
    magic: [0x50, 0x4B, 0x03, 0x04],
    offset: 0,
    desc: 'OpenDocument Presentation. LibreOffice Impress format.',
    mime: 'application/vnd.oasis.opendocument.presentation'
  },

];

// ── Helper: count unique formats ──────────────────────────────
window.SIGNATURE_COUNT = window.SIGNATURES.length;
