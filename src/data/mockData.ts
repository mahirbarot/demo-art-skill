/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ServiceDetail, Testimonial, FAQItem, Project } from '../types';

export const SERVICES: ServiceDetail[] = [
  {
    id: 'vector-conversion',
    title: 'Vector Conversion',
    tagline: 'Infinite Scalability. Pristine Math.',
    description: 'Convert raster images (JPEG, PNG, PSD) into crisp, scalable vector graphics (AI, EPS, SVG, PDF) for printing, laser cutting, and digital scaling. Every anchor point and path is drawn manually for maximum accuracy.',
    features: [
      '100% manual vector tracing (no automated trace utilities)',
      'High-quality crisp bezier curves and matching fonts',
      'Ready for large-format printing, signage, and merchandise',
      'Output formats: AI, EPS, SVG, PDF, high-res PNG'
    ],
    turnaround: '12 - 24 Hours',
    imagePlaceholder: 'vector'
  },
  {
    id: 'clipping-path',
    title: 'Clipping Path',
    tagline: 'Hand-Drawn Bezier Pen Masks.',
    description: 'Get razor-sharp borders and absolute separation using industry-standard manual Photoshop Pen tool clipping paths. Ideal for catalog printing, high-end e-commerce product listings, and advertising layouts.',
    features: [
      'Multi-clipping paths for separate product editing',
      'Perfect edge smoothing without pixelations or blur',
      'Active path storage inside TIFF, JPEG, or PSD structures',
      'Clean cutouts of any product, model, or machinery'
    ],
    turnaround: '12 - 24 Hours',
    imagePlaceholder: 'clipping'
  },
  {
    id: 'background-removal',
    title: 'Background Removal',
    tagline: 'Isolate Your Products Instantly.',
    description: 'Isolate items from busy or standard white backdrops. We replace, clean, or export products with complete transparency, enabling seamless integrations into catalogs, web applications, or composite layouts.',
    features: [
      'Transparent PNG or custom solid background replacement',
      'Web-optimized resolution sizing and compression scaling',
      'Consistent margins, sizing, and vertical alignments across catalogs',
      'Bulk processing for large-scale inventory uploads'
    ],
    turnaround: '12 - 24 Hours',
    imagePlaceholder: 'background'
  },
  {
    id: 'image-masking',
    title: 'Image Masking',
    tagline: 'Surgical Precision for Fine Hair & Soft Edges.',
    description: 'Perfect for complex subjects like human hair, fur, transparent glass, or fine mesh that cannot be cleanly separated using standard clipping paths. We utilize advanced channel and color range masking.',
    features: [
      'Soft-edge hair and fur preservation masking',
      'Transparency masking for bottles, glassware, and plastics',
      'Color channel extraction for complex tree/foliage borders',
      'Extremely detailed layers for beauty and fashion images'
    ],
    turnaround: '24 Hours',
    imagePlaceholder: 'masking'
  },
  {
    id: 'photo-retouching',
    title: 'Photo Retouching',
    tagline: 'High-End Beauty, Skin & Product Cosmetics.',
    description: 'Premium restoration, skin cleaning, color corrections, and structural enhancement. From high-fashion editorial portraits to polished e-commerce product photos, we bring out the absolute best in every pixel.',
    features: [
      'Frequency separation skin retouching (retains natural pores)',
      'Blemish and dust removal, glare adjustments, reflection control',
      'Digital makeup, hair cleanup, teeth whitening, eye brightness',
      'Color temperature matching, contrast tuning, and tone styling'
    ],
    turnaround: '24 - 48 Hours',
    imagePlaceholder: 'retouching'
  },
  {
    id: 'shadow-creation',
    title: 'Shadow Creation',
    tagline: 'Add Depth & Realistic Dimension.',
    description: 'Incorporate realistic shadows beneath isolated product shots to add weight, visual ground, and premium depth. We construct soft, natural drop, reflection, or custom-angle studio light shadows.',
    features: [
      'Natural drop shadows utilizing existing light vectors',
      'Polished table-top mirror reflection shadows',
      'Realistic ambient shadows for grounding isolated items',
      'Controllable feather, opacity, and blur parameters'
    ],
    turnaround: '12 - 24 Hours',
    imagePlaceholder: 'shadow'
  },
  {
    id: 'ghost-mannequin',
    title: 'Ghost Mannequin',
    tagline: 'Invisible 3D Apparel Editing.',
    description: 'Also known as hollow man, we merge multiple apparel shots (inside-out collars, cuffs, and front views) to create a premium, hollow 3D visual. This displays the full shape, fit, and inner details of clothing.',
    features: [
      'Collar and inner neck joint merging from separate shots',
      'Symmetric shaping, wrinkle smoothing, and fabric straightening',
      'Ghost effect for coats, jeans, dresses, caps, and blazers',
      'Natural depth shading inside the garment cavity'
    ],
    turnaround: '12 - 24 Hours',
    imagePlaceholder: 'ghost'
  },
  {
    id: 'color-change',
    title: 'Color Change',
    tagline: 'Multi-Color Variations Without Reshooting.',
    description: 'Digitally convert product colors to represent any SKU or swatch. Send us one base photograph, and we will accurately render a matching color catalog representing your entire color lineup.',
    features: [
      'Exact Pantone, RGB, or Hex matching',
      'Texture and shading retention across changed colors',
      'Gold, chrome, metallic, and matte conversion options',
      'Ideal for apparel, electronics, cosmetics, and furniture catalogs'
    ],
    turnaround: '12 - 24 Hours',
    imagePlaceholder: 'color'
  },
  {
    id: 'image-manipulation',
    title: 'Image Manipulation',
    tagline: 'Unleash Creative Vision.',
    description: 'Create compelling composites, advanced scenery extensions, and artistic advertising visuals. We combine multiple source images into one cohesive, seamless, and stunning high-resolution masterpiece.',
    features: [
      'Seamless multi-exposure compositing and blending',
      'Perspective corrections and creative light rendering',
      'Background extension, element additions, and scale modifications',
      'High-impact visual production for marketing campaigns'
    ],
    turnaround: '24 - 48 Hours',
    imagePlaceholder: 'manipulation'
  },
  {
    id: 'digitizing-services',
    title: 'Digitizing Services',
    tagline: 'Flawless Vector to Stitch Conversion.',
    description: 'Premium embroidery digitizing service for logos, caps, visors, jackets, and custom badges. We translate graphics into high-efficiency machine code with zero thread breaks and precise underlays.',
    features: [
      'Logo, cap, and pocket digitizing',
      'High-end 3D Puff embroidery, Applique, and chenille digitizing',
      'Optimized path structures for DST, PES, JEF, EXP, HUS, etc.',
      'Test sewn files ensuring perfect stitch density and tension compensation'
    ],
    turnaround: '12 - 24 Hours',
    imagePlaceholder: 'digitizing'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Sarah Jenkins',
    role: 'Creative Director',
    company: 'Scribe Apparel Co.',
    content: 'Has Art Skill has completely transformed our e-commerce workflow. Their ghost mannequin and vector conversion services are flawless, and their turnaround time is routinely under 12 hours. The consistency they maintain across hundreds of product assets is unbelievable.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80',
    rating: 5
  },
  {
    id: 't2',
    name: 'Marcus Thorne',
    role: 'E-commerce Lead',
    company: 'PrimeMerch Global',
    content: 'We migrated our vectorization and logo digitizing to Has Art Skill six months ago and have seen a 40% drop in thread breakage on our production machines. Their embroidery files are optimized perfectly. Highly recommended for any serious graphics operation.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
    rating: 5
  },
  {
    id: 't3',
    name: 'Elena Rostova',
    role: 'Brand Manager',
    company: 'Aura Cosmetics',
    content: 'The skin retouching and background shadow creation they did for our latest makeup launch was pristine. They retain the natural skin pores while polishing blemishes perfectly. It saved us thousands of dollars in commercial studio reshoots.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80',
    rating: 5
  },
  {
    id: 't4',
    name: 'David Kim',
    role: 'Operations Director',
    company: 'Velo Sports Gear',
    content: 'Managing a catalog of 2000+ items is incredibly demanding. Has Art Skill handles our background removal and color matching seamlessly. The communication is ultra-clear, and they always go the extra mile for rush deadlines.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80',
    rating: 5
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'f1',
    question: 'What is your typical turnaround time?',
    answer: 'Our standard turnaround is 12 to 24 hours. Complex projects such as high-end beauty retouching, custom vector illustrations, or extensive image manipulations may require 24 to 48 hours depending on volume. Rush delivery (under 6 hours) is available upon request.'
  },
  {
    id: 'f2',
    question: 'How do I submit large files for production?',
    answer: 'For files under 10 MB, you can upload them directly in our "Submit Project" page. For bulk folders or files exceeding 10 MB, we recommend uploading them to Google Drive, Dropbox, or WeTransfer and pasting the sharing link in the corresponding input field on our submission form.'
  },
  {
    id: 'f3',
    question: 'Which formats do you support for digitizing?',
    answer: 'We support all major embroidery machine formats including DST, PES, JEF, EXP, HUS, XXX, and VIP. We deliver optimized files customized for cap embroidery, 3D puff, left chest logos, or jacket backs.'
  },
  {
    id: 'f4',
    question: 'Do you offer unlimited revisions?',
    answer: 'Yes! We are dedicated to providing perfect results. If any asset does not meet your specifications, we will revise it for free until you are 100% satisfied.'
  },
  {
    id: 'f5',
    question: 'How does billing and payment work?',
    answer: 'We offer flexible payment terms. For individual or one-off tasks, payments are completed secure-online. For high-volume enterprise clients, we offer weekly or monthly invoicing plans backed by dedicated accounts.'
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'HAS-8104',
    clientName: 'Sarah Jenkins',
    companyName: 'Scribe Apparel Co.',
    email: 'sarah@scribeapparel.com',
    phone: '+1 (555) 392-1049',
    serviceRequired: 'Ghost Mannequin',
    projectDescription: 'Merge neck joins and sleeves for 18 items of our Summer linen shirt lineup. Clean wrinkles.',
    deadline: '2026-06-30',
    budget: '$360',
    uploadedFile: 'summer_linen_package.zip',
    googleDriveLink: 'https://drive.google.com/drive/folders/1aBcD_ScribeApparelSummer',
    additionalNotes: 'Please maintain standard shadows below the collar. Uniform sizing.',
    status: 'In Progress',
    priority: 'High',
    submissionDate: '2026-06-27T10:14:00Z',
    notes: 'Assigning to lead clothing retoucher. Files downloaded and verified.',
    timeline: [
      { status: 'Todo', updatedAt: '2026-06-27T10:14:00Z', updatedBy: 'System', comment: 'Client submitted form via Tally' },
      { status: 'Review', updatedAt: '2026-06-27T11:30:00Z', updatedBy: 'Admin', comment: 'Details verified, files checked' },
      { status: 'In Progress', updatedAt: '2026-06-27T12:00:00Z', updatedBy: 'Admin', comment: 'Production started' }
    ]
  },
  {
    id: 'HAS-8105',
    clientName: 'Marcus Thorne',
    companyName: 'PrimeMerch Global',
    email: 'marcus@primemerch.com',
    phone: '+1 (555) 482-1920',
    serviceRequired: 'Digitizing Services',
    projectDescription: 'Logo vector-to-stitch digitization for left chest caps and heavy hoodies. Needs DST and PES formats.',
    deadline: '2026-07-02',
    budget: '$120',
    uploadedFile: 'primemerch_logo_vector.eps',
    googleDriveLink: '',
    additionalNotes: 'Need a test sew report if possible. Stitch count should be around 8k.',
    status: 'Review',
    priority: 'Medium',
    submissionDate: '2026-06-28T04:20:00Z',
    notes: 'Checked SVG. Needs tight underlays for polyester caps. Will begin soon.',
    timeline: [
      { status: 'Todo', updatedAt: '2026-06-28T04:20:00Z', updatedBy: 'System', comment: 'Client submitted form via Tally' },
      { status: 'Review', updatedAt: '2026-06-28T05:00:00Z', updatedBy: 'Admin', comment: 'Awaiting stitch artist queue allocation' }
    ]
  },
  {
    id: 'HAS-8106',
    clientName: 'Elena Rostova',
    companyName: 'Aura Cosmetics',
    email: 'elena@auracosmetics.co',
    phone: '+33 6 1234 5678',
    serviceRequired: 'Photo Retouching',
    projectDescription: 'Surgical makeup blending and high-end skin retouching on 5 promotional headshots.',
    deadline: '2026-07-05',
    budget: '$500',
    uploadedFile: 'skin_headshots_raw.zip',
    googleDriveLink: 'https://drive.google.com/drive/folders/1xYz_AuraBeautyRaw',
    additionalNotes: 'Keep the original skin pore texture. Frequency separation technique required.',
    status: 'Todo',
    priority: 'Urgent',
    submissionDate: '2026-06-28T05:30:00Z',
    notes: '',
    timeline: [
      { status: 'Todo', updatedAt: '2026-06-28T05:30:00Z', updatedBy: 'System', comment: 'Client submitted form via Tally' }
    ]
  },
  {
    id: 'HAS-8101',
    clientName: 'David Kim',
    companyName: 'Velo Sports Gear',
    email: 'david@velosports.com',
    phone: '+1 (555) 902-3940',
    serviceRequired: 'Background Removal',
    projectDescription: 'Batch removal of background for 120 sports helmet catalog pictures. Render onto transparent PNG.',
    deadline: '2026-06-26',
    budget: '$150',
    uploadedFile: 'velo_helmets_raw.zip',
    googleDriveLink: '',
    additionalNotes: 'Deliver 1500x1500px square format. Web-optimized.',
    status: 'Delivered',
    priority: 'Low',
    submissionDate: '2026-06-24T08:15:00Z',
    notes: 'Completed beautifully. Deliverable downloaded by client.',
    timeline: [
      { status: 'Todo', updatedAt: '2026-06-24T08:15:00Z', updatedBy: 'System', comment: 'Form submission' },
      { status: 'Review', updatedAt: '2026-06-24T09:00:00Z', updatedBy: 'Admin' },
      { status: 'In Progress', updatedAt: '2026-06-24T09:30:00Z', updatedBy: 'Admin' },
      { status: 'Completed', updatedAt: '2026-06-25T15:00:00Z', updatedBy: 'Admin', comment: 'File package assembled' },
      { status: 'Delivered', updatedAt: '2026-06-25T16:20:00Z', updatedBy: 'Admin', comment: 'Download links dispatched' }
    ]
  },
  {
    id: 'HAS-8102',
    clientName: 'Thomas Vance',
    companyName: 'Vance Signs',
    email: 'tommy@vancesigns.biz',
    phone: '+1 (555) 782-9904',
    serviceRequired: 'Vector Conversion',
    projectDescription: 'Reconstruct a heavily pixelated vintage logo from a 200px scan into infinite vector AI format.',
    deadline: '2026-06-27',
    budget: '$75',
    uploadedFile: 'pixelated_vintage_logo.jpg',
    googleDriveLink: '',
    additionalNotes: 'Need exact match for the historical typography if possible, or trace letters.',
    status: 'Completed',
    priority: 'Medium',
    submissionDate: '2026-06-25T14:40:00Z',
    notes: 'Hand-traced matching letters perfectly using Bezier curves.',
    timeline: [
      { status: 'Todo', updatedAt: '2026-06-25T14:40:00Z', updatedBy: 'System' },
      { status: 'Review', updatedAt: '2026-06-25T15:30:00Z', updatedBy: 'Admin' },
      { status: 'In Progress', updatedAt: '2026-06-25T16:00:00Z', updatedBy: 'Admin' },
      { status: 'Completed', updatedAt: '2026-06-26T18:00:00Z', updatedBy: 'Admin', comment: 'Completed tracing. Exported AI and SVG.' }
    ]
  },
  {
    id: 'HAS-8103',
    clientName: 'Clara Oswald',
    companyName: 'Tardis Collectibles',
    email: 'clara@tardiscollectibles.org',
    phone: '+44 7700 900077',
    serviceRequired: 'Clipping Path',
    projectDescription: 'Create clipping paths for 45 porcelain antique figures. Backgrounds should be pure white.',
    deadline: '2026-06-29',
    budget: '$225',
    uploadedFile: 'tardis_porcelain_pack.rar',
    googleDriveLink: 'https://drive.google.com/drive/folders/1_TardisPorcelain45',
    additionalNotes: 'Slight feather on reflections is required to look natural.',
    status: 'Todo',
    priority: 'Medium',
    submissionDate: '2026-06-26T22:12:00Z',
    notes: 'Will download folders and start production queue tomorrow morning.',
    timeline: [
      { status: 'Todo', updatedAt: '2026-06-26T22:12:00Z', updatedBy: 'System' }
    ]
  }
];
