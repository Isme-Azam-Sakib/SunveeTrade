/**
 * Static catalog data for Rhinestone and Stud products.
 * Extracted from Shine Art catalog for Sunvee Trade International.
 *
 * Designed as a clean, structured reference (non-ecommerce) containing
 * product specifications, applications, material characteristics, and imagery.
 */

export type RhinestoneCategory = "hot-fix" | "sew-on" | "film" | "accessories";

export interface RhinestoneItem {
  readonly id: string;
  readonly title: string;
  readonly category: RhinestoneCategory;
  readonly categoryLabel: string;
  readonly image: string;
  readonly alt: string;
  readonly description: string;
  readonly detailImages?: readonly string[];
}

export interface RhinestoneCategoryGroup {
  readonly category: RhinestoneCategory;
  readonly label: string;
  readonly description: string;
  readonly items: readonly RhinestoneItem[];
}

export const rhinestoneItems: readonly RhinestoneItem[] = [
  {
    id: "premium-m-c-rhinestone",
    title: "Premium M/C Rhinestone",
    category: "hot-fix",
    categoryLabel: "Hot-Fix Rhinestones & Studs",
    image: "https://www.shine-art.com/wp-content/uploads/2015/12/PREMIUM-MC-RHINESTONE.jpg",
    alt: "PREMIUM MC RHINESTONE",
    description: "Premium M/C Rhinestone Hot Fix is one of our top quality product line that only includes strictly selected items from our wide range of products. Premium M/C Rhinestone Hot Fix comes in more than 39 unique colors and various sizes ranging from SS-03 to SS-40. By proceeding with the most delicate procedure, a machine is used to cut and polish each facet during production which gives our Premium M/C Rhinestone Hot Fix’s exceptional brilliance from the high quality raw materials. All products go through an intensive quality control and are fully inspected to ensure that the products remain stable and are of high quality. Prices of the Premium M/C Rhinestone Hot Fix is competitively cheaper than other top brands’ machine cut stones yet satisfactory to be alternatives.",
    detailImages: [
      "https://shine-art.com/wp-content/uploads/2015/12/101-Premium-Pellosa-MC-RHinestone.png",
      "https://shine-art.com/wp-content/uploads/2015/12/Premium-MC-Size-4x3-1024x768.jpg",
      "https://shine-art.com/wp-content/uploads/2015/12/prm_mc_color_chart-640x1024.png",
    ],
  },
  {
    id: "machine-cut-shape-stone",
    title: "Machine Cut Shape Stone",
    category: "hot-fix",
    categoryLabel: "Hot-Fix Rhinestones & Studs",
    image: "https://www.shine-art.com/wp-content/uploads/2015/12/MC-SHAPE-STONE.jpg",
    alt: "MC SHAPE STONE",
    description: "Machine Cut Shape Stone Hot Fix comes in unique shapes and is available in most common colors. Using good quality raw materials and adopting the most delicate procedure, a machine is used to cut and polish each facet during production which gives our Machine Cut Shape Stone Hot Fix its sparkling and glossy look. All products go through an intensive quality control and are fully inspected to ensure that the rhinestones are stable and are of high quality. Prices of Machine Cut Shape Hot Fix is competitively cheaper than other top brands’ machine cut stones yet satisfactory to be alternatives for those product.",
    detailImages: [
      "https://shine-art.com/wp-content/uploads/2015/12/102-PELLOSA-MC-SHAPE-STONE.png",
      "https://shine-art.com/wp-content/uploads/2015/12/Normal-MC-Shape-Size-4x81-512x1024.jpg",
      "https://shine-art.com/wp-content/uploads/2015/12/Normal-MC-Shape-Color-4x21-1024x512.jpg",
    ],
  },
  {
    id: "rhinestone-a",
    title: "Rhinestone(A)",
    category: "hot-fix",
    categoryLabel: "Hot-Fix Rhinestones & Studs",
    image: "https://www.shine-art.com/wp-content/uploads/2015/12/RHINESTONEA.jpg",
    alt: "RHINESTONE(A)",
    description: "Rhinestone A Hot Fix is the most well-known quality among all kinds of rhinestones’ quality grade, and is also known as ‘Korean Rhinestone’, ’AAA Rhinestones’, and/or ’AAAA Rhinestones’. Rhinestone A Hot Fix has been considered most suitable and affordable quality for all range of production scale due to its stable quality and competitive prices. Our Rhinestone A Hot Fix is the definition and standard of this grade that meets exact expectation for this quality. With the focus being on obtaining better quality, we were able to develop more colors, and so, Rhinestone A Hot Fix comes with more than 78 different color options and sizes covering from SS-04 and SS-40.",
    detailImages: [
      "https://shine-art.com/wp-content/uploads/2015/12/103-RHINESTONEA.png",
      "https://shine-art.com/wp-content/uploads/2015/12/Rhinestone-A-Size-4x3-1024x768.jpg",
      "https://shine-art.com/wp-content/uploads/2015/12/Rhinestone-A-Color-5x16-320x1024.jpg",
    ],
  },
  {
    id: "shape-stone-a",
    title: "Shape Stone(A)",
    category: "hot-fix",
    categoryLabel: "Hot-Fix Rhinestones & Studs",
    image: "https://www.shine-art.com/wp-content/uploads/2015/12/SHAPE-STONEA.jpg",
    alt: "SHAPE STONE(A)",
    description: "Shaped stone (A) Hot Fix is the most well known quality among all kinds of rhinestones’ quality grade, and is also known as ‘Korean Rhinestone’, ’AAA Rhinestones’, and/or ’AAAA Rhinestones’. Shaped stone (A) Hot Fix has been considered most suitable and affordable quality for all range of production scale due to its stable quality and competitive prices. Our shaped stone (A) Hot Fix is the definition and standard of this grade that meets exact expectation for this quality.",
    detailImages: [
      "https://shine-art.com/wp-content/uploads/2015/12/104-SHAPE-STONEA.png",
      "https://shine-art.com/wp-content/uploads/2015/12/Rhinestone-A-Shape-Size-4x3-1024x768.jpg",
      "https://shine-art.com/wp-content/uploads/2015/12/Rhinestone-A-Shape-color-4x4-1024x1024.jpg",
    ],
  },
  {
    id: "ceramic-stone",
    title: "Ceramic Stone",
    category: "hot-fix",
    categoryLabel: "Hot-Fix Rhinestones & Studs",
    image: "https://www.shine-art.com/wp-content/uploads/2015/12/CERAMIC-STONE.jpg",
    alt: "CERAMIC STONE",
    description: "Ceramic Stone Hot Fix is made of a strong ceramic clay material usually used to make bowls, dishes, and tiles yet light enough to be used on garments. The surface of Ceramic Stone Hot Fix is finely polished to ensure an elegant texture and topped with a glossy coating to give it a more radiant shine. Unlike other products where colors are added by applying the coating, Ceramic Stone’s colors are natural and comes from the raw material itself. Ceramic Stones Hot Fix can be combined with metal ring to give a different look and effect. Ceramic Stone Hot Fix is round shaped and is available in various sizes with 20+ unique colors to choose from.",
    detailImages: [
      "https://shine-art.com/wp-content/uploads/2015/12/105-CERAMIC-STONE.png",
      "https://shine-art.com/wp-content/uploads/2015/12/Ceramic-Stone-Size-6x2-1024x341.jpg",
      "https://shine-art.com/wp-content/uploads/2015/12/Ceramic-Stone-Color-4x2-1024x512.jpg",
    ],
  },
  {
    id: "new-rhinestone",
    title: "New Rhinestone",
    category: "hot-fix",
    categoryLabel: "Hot-Fix Rhinestones & Studs",
    image: "https://www.shine-art.com/wp-content/uploads/2015/12/NEW-RHINESSTONE.jpg",
    alt: "NEW RHINESSTONE",
    description: "New Rhinestone Hot Fix is the most economical option when it comes to Rhinestones. New Rhinestone Hot Fix is mainly developed to meet customer’s needs for inexpensive rhinestones with low lead contents. With being compliant for low lead regulations against harmful chemicals within the products and is being strictly enforced, New Rhinestone Hot Fix is the right product for your needs since the raw materials used contains low lead contents. For each production, a test is run to check its lead contents to guarantee that it is no more than 90PPM. New Rhinestone Hot Fix comes in 48 different colors, and sizes that covers from SS-04 to SS-40. Please kindly contact our sales team to get more information on lead test.",
    detailImages: [
      "https://shine-art.com/wp-content/uploads/2015/12/106-NEW-RHINESSTONE.png",
      "https://shine-art.com/wp-content/uploads/2015/12/New-Rhinestone-Size-5x2-1024x410.jpg",
      "https://shine-art.com/wp-content/uploads/2015/12/New-Rhinestone-Color-5x10-512x1024.jpg",
    ],
  },
  {
    id: "ring-stone-rhinestone-a",
    title: "Ring Stone + Rhinestone(A)",
    category: "hot-fix",
    categoryLabel: "Hot-Fix Rhinestones & Studs",
    image: "https://www.shine-art.com/wp-content/uploads/2015/12/RING-STONE.jpg",
    alt: "RING STONE",
    description: "Ring Stone Hot Fix is consisted of Rhinestone and metal ring surrounding the rhinestone. Metal ring used in Ring Stone Hot Fix has prongs that hold tightly onto the back of the stones. Equipped machines is used for mass production is so that the product processing time is much shorter than other manufacturers. Ring Stone Hot Fix covers all the sizes and colors of as seen for Rhinestone A Hot Fix and New Rhinestone Hot Fix. By adding metal ring, those rhinestones would develop a unique look, opening up various options when creating designs.",
    detailImages: [
      "https://shine-art.com/wp-content/uploads/2015/12/108-RING-STONE.png",
      "https://shine-art.com/wp-content/uploads/2015/12/Ring-Stone-Size-5x3-1024x614.jpg",
      "https://shine-art.com/wp-content/uploads/2015/12/Ringstone-Color-6x14-439x1024.jpg",
    ],
  },
  {
    id: "octagon",
    title: "Octagon",
    category: "hot-fix",
    categoryLabel: "Hot-Fix Rhinestones & Studs",
    image: "https://www.shine-art.com/wp-content/uploads/2015/12/OCTAGON.jpg",
    alt: "OCTAGON",
    description: "Octagon Hot Fix is also known as “Rhinestuds” since its shape is similar to Rhinestones, but for Octagon Hot Fix, it’s made of aluminum. Octagon Hot Fix has long been loved by customers as one of top steady seller following the rhinestones since it can be an economical alternative for rhinestones. Besides being alternatives of rhinestones, Octagon Hot Fix has its own beauty that comes from its wide range of rich and vivid colors.",
    detailImages: [
      "https://shine-art.com/wp-content/uploads/2015/12/110-OCTAGON.png",
      "https://shine-art.com/wp-content/uploads/2015/12/Octagon-Size-6x1-1024x171.jpg",
      "https://shine-art.com/wp-content/uploads/2015/12/Octagon-Color-5x9-569x1024.jpg",
    ],
  },
  {
    id: "half-round",
    title: "Half Round",
    category: "hot-fix",
    categoryLabel: "Hot-Fix Rhinestones & Studs",
    image: "https://www.shine-art.com/wp-content/uploads/2015/12/HALF-ROUND.jpg",
    alt: "HALF ROUND",
    description: "Half Round Hot Fix is lightweight and has a unique hemisphere shape that is idle to reflect all the light it gets to give a glossy and sparkling look with the most number of colors. As one of top selling products in all time and new colors constantly being developed and added to its line, it now have more than 70 colors, which includes consistent solid colors in all production batches, fluorescent colors that will make your designs vivid and strong, elegant pearl colors, AB coated colors, and matt colors. Due to the top end tip of the Half Round Hot Fix being narrow, it’s recommended to use Silicon Hot Fix Tape for this product to avoid possible unwanted movement of stones when putting them on hot fix tape.",
    detailImages: [
      "https://shine-art.com/wp-content/uploads/2015/12/111-HALF-ROUND.png",
      "https://shine-art.com/wp-content/uploads/2015/12/Half-Round-Size-4x2-1024x512.jpg",
      "https://shine-art.com/wp-content/uploads/2015/12/Half-Round-Color-6x13-473x1024.jpg",
    ],
  },
  {
    id: "nailhead",
    title: "Nailhead",
    category: "hot-fix",
    categoryLabel: "Hot-Fix Rhinestones & Studs",
    image: "https://www.shine-art.com/wp-content/uploads/2015/12/NAILHEAD.jpg",
    alt: "NAILHEAD",
    description: "Nailhead Hot Fix is one of our items that are made of aluminum. Nailhead Hot Fix is flat, thin, and lightweight so that it can be easily transferred onto fabrics. With its stability in productions and high quality, Nailhead Hot Fix is delightfully economic and is used to express varied designs. Nailhead Hot Fix has a range of more than 60 vivid colors selection with various sizes and shapes ranging from Round 1.2mm to Square 30x30mm, Heart, Star, Leaf, and etc.",
    detailImages: [
      "https://shine-art.com/wp-content/uploads/2015/12/116-NAILHEAD.png",
      "https://shine-art.com/wp-content/uploads/2015/12/Nailhead-shape-10x11-931x1024.jpg",
      "https://shine-art.com/wp-content/uploads/2015/12/Nailhead-color-7x9-796x1024.jpg",
    ],
  },
  {
    id: "nailhead-check",
    title: "Nailhead Check",
    category: "hot-fix",
    categoryLabel: "Hot-Fix Rhinestones & Studs",
    image: "https://www.shine-art.com/wp-content/uploads/2015/12/NAILHEAD-CHECK.jpg",
    alt: "NAILHEAD CHECK",
    description: "Nailhead Check Hot Fix is identical to Nailhead Hot Fix, but with 2 types of check patterns engraved on the surface. One pattern is crossed narrowly from one side to the other whereas the second type is more widely carved, which can give the design a more unique, distinctive, and stunning look. Nailhead Check Hot Fix has a range of more than 60 vivid colors selection with various sizes and shapes ranging from Round 1.2mm to Square 30x30mm, Heart, Star, Leaf, and etc.",
    detailImages: [
      "https://shine-art.com/wp-content/uploads/2015/12/117-NAILHEAD-CHECK.png",
      "https://shine-art.com/wp-content/uploads/2015/12/Nailhead-Check-Size-7x13-512x1024.jpg",
      "https://shine-art.com/wp-content/uploads/2015/12/Nailhead-Check-color-6x5-1024x853.jpg",
    ],
  },
  {
    id: "nailhead-others",
    title: "Nailhead Others",
    category: "hot-fix",
    categoryLabel: "Hot-Fix Rhinestones & Studs",
    image: "https://www.shine-art.com/wp-content/uploads/2015/12/NAILHEAD-OTHERS.jpg",
    alt: "NAILHEAD OTHERS",
    description: "Nailhead Others Hot Fix has the highest, most stable quality amongst our Nailhead Hot Fix product line and is also made of aluminum. Nailhead Others Hot Fix have more than 50 colors that are very distinguished with a very dynamic and distinctive shapes such as Pyramid Long Triangle, Rim Flower-Dot, Rim Star, Dia-Ray, and etc. An impressive and unique outcome of a design can be obtainable with its unique shapes and quality.",
    detailImages: [
      "https://shine-art.com/wp-content/uploads/2015/12/118-NAILHEAD-OTHERS.png",
      "https://shine-art.com/wp-content/uploads/2015/12/Nailhead-Others-Size-8x8-1024x1024.jpg",
      "https://shine-art.com/wp-content/uploads/2015/12/Nailhead-others-color-6x9-683x1024.jpg",
    ],
  },
  {
    id: "antique-metal",
    title: "Antique Metal",
    category: "hot-fix",
    categoryLabel: "Hot-Fix Rhinestones & Studs",
    image: "https://www.shine-art.com/wp-content/uploads/2015/12/ANTIQUE-METAL.jpg",
    alt: "ANTIQUE METAL",
    description: "Antique Metal Hot Fix is made of brass and is available in our metal product line that we offer. Antique Metal Hot Fix has the most varieties in shapes such as Round, Oval, Cone, Square, etc., as well as distinct Cross, Jewelry, Skull, and Tornado shapes. Antique Metal Hot Fix has 9 colors where it portrays a vintage style along with additional 3 fluorescent colors expressing a vivid and unique style. In order to meet many requests, Antique Metal Hot Fix is offered at an incredibly low-price to meet your needs of a vintage style.",
    detailImages: [
      "https://shine-art.com/wp-content/uploads/2015/12/119-ANTIQUE-METAL.png",
      "https://shine-art.com/wp-content/uploads/2015/12/Antique-Metal-Size-7x10-796x1024.jpg",
      "https://shine-art.com/wp-content/uploads/2015/12/Antique-Metal-color-4x3-1024x768.jpg",
    ],
  },
  {
    id: "convex-i",
    title: "Convex I",
    category: "hot-fix",
    categoryLabel: "Hot-Fix Rhinestones & Studs",
    image: "https://www.shine-art.com/wp-content/uploads/2015/12/CONVEX-I.jpg",
    alt: "CONVEX I",
    description: "Convex I Hot Fix can be a great alternative of rivet accessory which can be uncomfortable to attach. Convex I Hot Fix is of high and stable quality made of aluminum, brass, and zinc. With its perfectly chic and strong style, it looks great when attaching Convex I Hot Fix on garments, shoes, bags, accessories and much more. Convex I Hot Fix has more than 35 various shapes such as Dome, Star, Cone, Cup, Octagon, Spiral, Sun, and etc. with 9 classical color options. To make the garment more unique, we also supply the Convex I Hot Fix in alphabetical letters, which you can choose from 2 different styles like Solid and Check pattern.",
    detailImages: [
      "https://shine-art.com/wp-content/uploads/2015/12/120-CONVEX-I.png",
      "https://shine-art.com/wp-content/uploads/2015/12/Convex-I-Size-5x8-640x1024.jpg",
      "https://shine-art.com/wp-content/uploads/2015/12/Convex-I-color-3x3-1024x1024.jpg",
    ],
  },
  {
    id: "wheel",
    title: "Wheel",
    category: "hot-fix",
    categoryLabel: "Hot-Fix Rhinestones & Studs",
    image: "https://www.shine-art.com/wp-content/uploads/2015/12/WHEEL.jpg",
    alt: "WHEEL",
    description: "Wheel Hot Fix is one of our highest qualities in our laser cutting hot fix product line and is made of aluminum. Wheel Hot Fix comes in 5 different styles such as Faceted Cut, Full Cut, Magic Cut, Round Center Cut, and Star Cut. Wheel Hot Fix looks so luxurious and bright with its sparkle, which definitely shows its own inventive and distinctive styles. Wheel Hot Fix is thin, flat, and lightweight so that it can be easily transferred onto textiles and fabrics.",
    detailImages: [
      "https://shine-art.com/wp-content/uploads/2015/12/123-WHEEL.png",
      "https://shine-art.com/wp-content/uploads/2015/12/Wheel-shape-4x4-1-1024x1024.jpg",
      "https://shine-art.com/wp-content/uploads/2015/12/Wheel-color-3x1-1024x341.jpg",
    ],
  },
  {
    id: "laser-cut",
    title: "Laser Cut",
    category: "hot-fix",
    categoryLabel: "Hot-Fix Rhinestones & Studs",
    image: "https://www.shine-art.com/wp-content/uploads/2015/12/LASER-CUT.jpg",
    alt: "LASER CUT",
    description: "Laser Cut Hot Fix is one of the Korean quality hot fix, and is made from aluminum. By using Korean advanced cutting techniques, 4 different shapes was made, such as Oval, Rectangle, Round, and Square with 3 different colors. Laser Cut Hot Fix is thin, flat and lightweight so that it can be easily attached onto garments. With Laser Cut Hot Fix’s unique style, your clothing will look unlike others.",
    detailImages: [
      "https://shine-art.com/wp-content/uploads/2015/12/124-LASER-CUT.png",
      "https://shine-art.com/wp-content/uploads/2015/12/Laser-cut-shape-4x3-1024x768.jpg",
      "https://shine-art.com/wp-content/uploads/2015/12/Laser-cut-color-3x1-1024x341.jpg",
    ],
  },
  {
    id: "abs-stud",
    title: "ABS Stud",
    category: "hot-fix",
    categoryLabel: "Hot-Fix Rhinestones & Studs",
    image: "https://www.shine-art.com/wp-content/uploads/2015/12/ABS-STUD.jpg",
    alt: "ABS STUD",
    description: "ABS Stud Hot Fix is made of special ABS resin material that gives them a more luxurious impression in comparison with metal or glass material. ABS Stud Hot Fix is similar to Convex Hot Fix but it is lightweight. ABS STUD hot fix is available in a unique dozen colors with various shapes. The particular slick surface of the ABS Stud Hot Fix gives a classy impression on your style. ABS stud hot fix can be applied onto garments, shoes, bags, accessories, and many more. When using the ABS Stud Hot Fix on Motif designs, it can easily be moved due to its height but can be resolved by using a special vacuum packing method.",
    detailImages: [
      "https://shine-art.com/wp-content/uploads/2015/12/130-ABS-STUD.png",
      "https://www.shine-art.com/wp-content/uploads/2015/12/ABS-Stud-Shape-5x3-1024x614.jpg",
      "https://shine-art.com/wp-content/uploads/2015/12/ABS-Stud-Color-5x3-1024x614.jpg",
    ],
  },
  {
    id: "pp-stone-sheet-type-1",
    title: "PP Stone Sheet Type 1",
    category: "hot-fix",
    categoryLabel: "Hot-Fix Rhinestones & Studs",
    image: "https://www.shine-art.com/wp-content/uploads/2015/12/PP-STONE-SHEET-TYPE-1.jpg",
    alt: "PP STONE SHEET TYPE 1",
    description: "PP Stone Sheet Hot Fix Type 1 is made using PP stones with cone at both sides. With the pointed back of the PP stones, it gets arranged on a glue sheet giving it a Milky Way effect since the PP stones are being placed randomly. Since PP Stone Sheet Hot Fix Type 1 is made with grade “A” quality PP stones; it keeps the excellent brilliance and shine. Each stone on the PP Stone Sheet Hot Fix Type 1 reflects light so radiantly that it gives a harmoniously sparkling show. PP Stone Sheet Hot Fix Type 1 comes in 8 colors and 3 available sizes like PP05 (SS-06), PP08 (SS-08), and PP12 (SS-12).",
    detailImages: [
      "https://shine-art.com/wp-content/uploads/2015/12/136-PP-STONE-SHEET-TYPE-1.png",
      "https://shine-art.com/wp-content/uploads/2015/12/PP-Stone-Type-1-shape-1024x341.jpg",
      "https://www.shine-art.com/wp-content/uploads/2015/12/PP-stone-type-1-color-4x3-1024x768.jpg",
    ],
  },
  {
    id: "pp-stone-sheet-type-2",
    title: "PP Stone Sheet Type 2",
    category: "hot-fix",
    categoryLabel: "Hot-Fix Rhinestones & Studs",
    image: "https://www.shine-art.com/wp-content/uploads/2015/12/PP-STONE-SHEET-TYPE-2.jpg",
    alt: "PP STONE SHEET TYPE 2",
    description: "PP Stone Sheet Hot Fix Type 2 is made using PP stones with cone on one side. With the pointed back of the PP stones, it gets arranged meticulously on a glue sheet filling it up and giving it a Milky Way effect with an elegant impression. Sine PP Stone Sheet Hot Fix Type 2 is made with grade “A” quality PP stones; it keeps the excellent brilliance and shine. PP stones are placed regularly on the glue sheet is Type 2. PP Stone Hot Fix Type 2 comes in 8 different colors and 2 types of sizes such as SS-06 and SS-08. PP Stone Sheet Hot Fix Type 2 can be easily applied to clothing and others garment accessories like bag, cap, etc.",
    detailImages: [
      "https://shine-art.com/wp-content/uploads/2015/12/137-PP-STONE-SHEET-TYPE-2.png",
      "https://shine-art.com/wp-content/uploads/2015/12/PP-Stone-Type-2-Shape-2x1-1024x512.jpg",
      "https://www.shine-art.com/wp-content/uploads/2015/12/PP-Stone-type-2-Color-4x3-1024x768.jpg",
    ],
  },
  {
    id: "stone-mesh",
    title: "Stone Mesh",
    category: "hot-fix",
    categoryLabel: "Hot-Fix Rhinestones & Studs",
    image: "https://www.shine-art.com/wp-content/uploads/2015/12/STONE-MESH.jpg",
    alt: "STONE MESH",
    description: "Stone Mesh Hot Fix is made by using combinations of PP stones and metal cap mesh on a glue sheet. Each stone is carefully set in a metal cap that available in silver, gold, and gray color. Stone Mesh Hot Fix can be used to cut in a single or multiple lines and applied to not only clothing but bags, shoes, and other type of accessories. Stone Mesh Hot Fix comes in different sizes and colors for both stone and mesh. Stone Mesh Hot Fix quality is kept high and has great brilliance since it is being made using grade “A” quality PP stones. Stone Mesh Hot Fix is also available without the glue sheet backing.",
    detailImages: [
      "https://shine-art.com/wp-content/uploads/2015/12/138-STONE-MESH.png",
      "https://shine-art.com/wp-content/uploads/2015/12/Stone-Mesh-Shape-3x2-1024x683.jpg",
      "https://shine-art.com/wp-content/uploads/2015/12/Stone-Mesh-Color-3x2-1024x683.jpg",
    ],
  },
  {
    id: "metal-mesh",
    title: "Metal Mesh",
    category: "hot-fix",
    categoryLabel: "Hot-Fix Rhinestones & Studs",
    image: "https://www.shine-art.com/wp-content/uploads/2015/12/METAL-MESH.jpg",
    alt: "METAL MESH",
    description: "Metal Mesh Hot Fix is a group of metal pieces, shaped in unique square or round shapes, and connected by rings. A glue sheet is placed at the bottom of the Metal Mesh Hot Fix for heat press application. Metal Mesh Hot Fix is pretty light when comparing it to its volume. Metal Mesh Hot Fix can easily be cut using regular scissors creating a single or multiple lines that can help your designs stand out and can be easily applied to jean, bag, shoes as well as clothing. Metal Mesh Hot Fix has more than 30 various colors, different sizes like 2.5mm, 3.5mm, 3mm, 4mm of the materials, and comes in distinctive shapes like dome, flat, rectangle, etc.",
    detailImages: [
      "https://shine-art.com/wp-content/uploads/2015/12/140-METAL-MESH.png",
      "https://shine-art.com/wp-content/uploads/2015/12/Metal-Mesh-Shape-5x1-1024x205.jpg",
      "https://shine-art.com/wp-content/uploads/2015/12/Metal-Mesh-Color-5x7-731x1024.jpg",
    ],
  },
  {
    id: "rim",
    title: "Rim",
    category: "hot-fix",
    categoryLabel: "Hot-Fix Rhinestones & Studs",
    image: "https://www.shine-art.com/wp-content/uploads/2015/12/Rim-Metal.jpg",
    alt: "Rim Metal Hot Fix",
    description: "New additions has been added to our New Metal Hot Fix Line for your metallic accessories needs in fashion. Rim Hot Fix is characterized by its outstanding height and an embossed surface where a glossy coating is applied to, which exerts a radiant shine. Rim Hot Fix comes in 6MM Round shape, 8MM Round shape, and a 8.5MM x 14.5MM Round Point shape. Rim Hot Fix is offered in 4 different rim colors such as Red, White, Pastel Sky, and Matte Black with 18 choices of inner colors to choose from that ranges from vivid fluorescent colors to soft pastel colors. With Rim Hot Fix, it can be use to define and accentuate the designs on garments, bags, shoes, accessories, and many other items.",
    detailImages: [
      "https://www.shine-art.com/wp-content/uploads/2016/02/8mm-MR-02.jpg",
      "https://www.shine-art.com/wp-content/uploads/2016/02/Metal-Rim-Hot-Fix-Inner-Size-5x3-1024x614.jpg",
      "https://www.shine-art.com/wp-content/uploads/2016/02/MetalRimMetalRimColor4x1-1024x256.jpg",
      "https://www.shine-art.com/wp-content/uploads/2016/02/MetalRimMetalInnerColor5x4-1024x819.jpg",
    ],
  },
  {
    id: "glitter",
    title: "Glitter",
    category: "film",
    categoryLabel: "Heat Transfer & Motif Films",
    image: "https://www.shine-art.com/wp-content/uploads/2015/12/GLITTER.jpg",
    alt: "GLITTER",
    description: "Korean Heat Transfer Vinyl is renowned not only for their superior quality but also their affordable price amongst all other Heat Transfer Vinyl. Korean Heat Transfer Vinyl undergoes strict inspection procedure to ensure that they are free from harmful components with upon contact while keeping the quality high and stabilized before shipment. Glitter Heat Transfer Vinyl, also known as &#8220;Glitter Film&#8221; or &#8220;Glitter Flake&#8221;, is made up of Hot Fix Polyester sheet covered by tiny glitter powder residue. Depending on your viewing angle, the glitter powder gives the Glitter Heat Transfer Vinyl glowing characteristics under the light. More than 36 distinctive colors are available for the Glitter Heat Transfer Vinyl, which includes fluorescent colors and multi rainbow mixed colors. Glitter Heat Transfer Vinyl can be cut using any vinyl cutters (plotters), scissors, or stylus and can be easily applied onto the garment by ironing it on or heat pressing (apply heat pressure). This video shows how to press GLITTER FILM MOTIF Do you want to get GLITTER FILM DESIGN MOTIF? You just send us actual size artwork and let us know what color glitter film you want! Pls see this video and get useful tips about press condition.",
    detailImages: [
      "https://shine-art.com/wp-content/uploads/2015/12/148-GLITTER.png",
      "https://www.shine-art.com/wp-content/uploads/2015/12/Glitter-Film-Hot-Fix-816x1024.jpg",
    ],
  },
  {
    id: "solid",
    title: "Solid",
    category: "film",
    categoryLabel: "Heat Transfer & Motif Films",
    image: "https://www.shine-art.com/wp-content/uploads/2015/12/SOLID.jpg",
    alt: "SOLID",
    description: "Korean Heat Transfer Vinyl is renowned not only for their superior quality but also their affordable price amongst all other Heat Transfer Vinyl. Korean Heat Transfer Vinyl undergoes strict inspection procedure to ensure that they are free from harmful components upon skin contact while keeping the quality high and stabilized before shipment. Solid Heat Transfer Vinyl is also known for “Solid Film” and “PU Film” and is made up of Polyurethane and is characterized by its elasticity and softness which feels almost non-existent upon touch. Solid Heat Transfer Vinyl is available in more than 20 vivd colors with a matte finish and reflective colors, which can be used on garments for sports, cross guards, safety guards, and etc. Solid Heat Transfer Vinyl can be cut using any vinyl cutters (plotters), scissors, or stylus and can be easily applied onto the garment by ironing it on or heat pressing (apply heat pressure).",
    detailImages: [
      "https://shine-art.com/wp-content/uploads/2015/12/149-SOLID.png",
      "https://shine-art.com/wp-content/uploads/2015/12/SOLID-COLOR.jpg",
    ],
  },
  {
    id: "flock",
    title: "Flock",
    category: "film",
    categoryLabel: "Heat Transfer & Motif Films",
    image: "https://www.shine-art.com/wp-content/uploads/2015/12/FLOCK.jpg",
    alt: "FLOCK",
    description: "Korean Heat Transfer Vinyl is renowned not only for their superior quality but also their affordable price amongst all other Heat Transfer Vinyl. Korean Heat Transfer Vinyl undergoes strict inspection procedure to ensure that they are free from harmful components upon skin contact while keeping the quality high and stabilized before shipment. Flock Heat Transfer Vinyl is also known for “Flock Film” and is made of Hot Fix Polyester sheet covered by a blended fabric giving it a lovely velvet finish. Flock Heat Transfer Vinyl is smooth to the touch and can be a great alternative for embroidery. Flock Heat Transfer Vinyl can be cut using any vinyl cutters (plotters), scissors, or stylus and can be easily applied onto the garment by ironing it on or heat pressing (apply heat pressure). This video shows how to press FLOCK FILM MOTIF Do you want to get FLOCK FILM DESIGN MOTIF? You just send us actual size artwork and let us know what color flock film you want!",
    detailImages: [
      "https://shine-art.com/wp-content/uploads/2015/12/150-FLOCK.png",
      "https://www.shine-art.com/wp-content/uploads/2015/12/Flock-Film-Hot-Fix-1024x602.jpg",
    ],
  },
  {
    id: "metallic",
    title: "Metallic",
    category: "film",
    categoryLabel: "Heat Transfer & Motif Films",
    image: "https://www.shine-art.com/wp-content/uploads/2015/12/METALLIC.jpg",
    alt: "METALLIC",
    description: "Korean Heat Transfer Vinyl is renowned not only for their superior quality but also their affordable price amongst all other Heat Transfer Vinyl. Korean Heat Transfer Vinyl undergoes strict inspection procedure to ensure that they are free from harmful components upon skin contact while keeping the quality high and stabilized before shipment. Metallic Heat Transfer Vinyl is also known as “Metallic Film” and is made of Polyester and features a mirror effect. Metallic Heat Transfer Vinyl has a wide range of rich and vivid colors and with it reflecting all lights giving the design a much more luxurious and sparkling look. Metallic Heat Transfer Vinyl can be cut using any vinyl cutters (plotters), scissors, or stylus and can be easily applied onto the garment by ironing it on or heat pressing (apply heat pressure).",
    detailImages: [
      "https://shine-art.com/wp-content/uploads/2015/12/151-METALLIC.png",
      "https://shine-art.com/wp-content/uploads/2015/12/METALLIC-COLOR.jpg",
    ],
  },
  {
    id: "holographic",
    title: "Holographic",
    category: "film",
    categoryLabel: "Heat Transfer & Motif Films",
    image: "https://www.shine-art.com/wp-content/uploads/2015/12/HOLOGRAPHIC.jpg",
    alt: "HOLOGRAPHIC",
    description: "Korean Heat Transfer Vinyl is renowned not only for their superior quality but also their affordable price amongst all other Heat Transfer Vinyl. Korean Heat Transfer Vinyl undergoes strict inspection procedure to ensure that they are free from harmful components upon skin contact while keeping the quality high and stabilized before shipment. Holographic Heat Transfer Vinyl is also known as “Holographic Film’ and is made of Polyester with characteristic holographic patterns giving it a radiant 3D effects. When using Holographic Heat Transfer Vinyl, it will surely make the design stand out. Holographic Film Vinyl can be cut using any vinyl cutters (plotters), scissors, or stylus and can be easily applied onto the garment by ironing it on or heat pressing (apply heat pressure).",
    detailImages: [
      "https://shine-art.com/wp-content/uploads/2015/12/152-HOLOGRAPHIC.png",
      "https://shine-art.com/wp-content/uploads/2015/12/HOLOGRAPHIC-COLOR.jpg",
    ],
  },
  {
    id: "design",
    title: "Design",
    category: "film",
    categoryLabel: "Heat Transfer & Motif Films",
    image: "https://www.shine-art.com/wp-content/uploads/2015/12/DESIGN.jpg",
    alt: "DESIGN",
    description: "Korean Heat Transfer Vinyl is renowned not only for their superior quality but also their affordable price amongst all other Heat Transfer Vinyl. Korean Heat Transfer Vinyl undergoes strict inspection procedure to ensure that they are free from harmful components upon skin contact while keeping the quality high and stabilized before shipment. Design Heat Transfer Vinyl is also known as “Design Film” and is made of a wide variety of Polyester shape patterns such as round, square, heart, and puzzle. 2 or more shape patterns can be selected for your project and designing needs. Due to the sublimation transfer method, Ink can be added to the Design Heat Transfer Vinyl giving a uniquely, outstanding vivid color. For any custom orders, please contact our professional and knowledgeable team for more information.",
    detailImages: [
      "https://shine-art.com/wp-content/uploads/2015/12/153-DESIGN.png",
      "https://shine-art.com/wp-content/uploads/2015/12/DESIGN-FILM-SIZE_01.jpg",
    ],
  },
  {
    id: "chaton-stone",
    title: "Chaton Stone",
    category: "sew-on",
    categoryLabel: "Sew-On Stones & Cup Chains",
    image: "https://www.shine-art.com/wp-content/uploads/2015/12/CHATON-STONE.jpg",
    alt: "CHATON STONE",
    description: "Chaton Stone is one of our premium grade product line that only includes strictly selected items from our wide range of products. Chaton Stone is a cone-shaped Crystal bead of which top circular edge is beveled. Chaton Stone can be held onto garments and accessories by using a metal cap, prong, and glue. Due to the Chaton Stone being so similar to the Premium Chaton Stone making it hard to distinguish when comparing the brilliance and sparkle from a distance along with the colors and shape varities, there are a few differences. Chaton Stone have fewer facets and is more affordable making it a great alternative.",
    detailImages: [
      "https://shine-art.com/wp-content/uploads/2015/12/143-PELLOSA-CHATON-STONE.png",
      "https://shine-art.com/wp-content/uploads/2015/12/Chaton-stone-Shape-6x9-683x1024.jpg",
      "https://shine-art.com/wp-content/uploads/2015/12/Chaton-stone-Color-4x5-819x1024.jpg",
    ],
  },
  {
    id: "chaton-stone-with-metal-cap",
    title: "Chaton Stone with Metal Cap",
    category: "sew-on",
    categoryLabel: "Sew-On Stones & Cup Chains",
    image: "https://www.shine-art.com/wp-content/uploads/2015/12/CHATON-STONE-WITH-METAL-CAP.jpg",
    alt: "CHATON STONE WITH METAL CAP",
    description: "Chaton Stone is one of our premium grade product that only includes strictly selected items from our wide range of products. Chaton Stone is a cone-shaped Crystal bead of which top circular edge is beveled. Chaton Stone can be held onto garments and accessories by using a metal cap, prong, and glue. Due to the Chaton Stone being so similar to the Premium Chaton Stone making it hard to distinguish when comparing the brilliance and sparkle from a distance along with the colors and shape varieties, there are a few differences. The Chaton Stone have fewer facets and is more affordable making it a great alternative.",
    detailImages: [
      "https://shine-art.com/wp-content/uploads/2015/12/143-PELLOSA-CHATON-STONE.png",
      "https://shine-art.com/wp-content/uploads/2015/12/Chaton-stone-Shape-6x9-683x1024.jpg",
      "https://shine-art.com/wp-content/uploads/2015/12/Chaton-stone-Color-4x5-819x1024.jpg",
    ],
  },
  {
    id: "sew-on-stone",
    title: "Sew On Stone",
    category: "sew-on",
    categoryLabel: "Sew-On Stones & Cup Chains",
    image: "https://www.shine-art.com/wp-content/uploads/2015/12/SEW-ON-STONE.jpg",
    alt: "SEW ON STONE",
    description: "Sew-On Stone is one of our premium grade product that only includes strictly selected items from our wide range of products. Sew-On Stone is offered with two to three open holes that are located on the end of the material. Sew-On Stone can be sewn onto various garments as well as specific material such as leather. Sew-On Stone is relatively more affordable than other top brands sew on stones and can make for a great alternative.",
    detailImages: [
      "https://shine-art.com/wp-content/uploads/2015/12/145-PELLOSA-SEW-ON-STONE.png",
      "https://shine-art.com/wp-content/uploads/2015/12/Sew-on-stone-Shape-6x7-878x1024.jpg",
      "https://shine-art.com/wp-content/uploads/2015/12/Sew-on-stone-Color-4x5-819x1024.jpg",
    ],
  },
  {
    id: "cup-stone",
    title: "Cup Stone",
    category: "sew-on",
    categoryLabel: "Sew-On Stones & Cup Chains",
    image: "https://www.shine-art.com/wp-content/uploads/2015/12/CUP-STONE.jpg",
    alt: "CUP STONE",
    description: "Cup Stone is one of our premium grade product that only includes strictly selected items from our wide range of products. Cup Stone is made from finely polished point back Chaton Stone where they are meticulously placed in a catch-free mounting metal Silver or Gold cup and is easily sewn onto the garments. Cup Stone comes in 22 unique colors with 4 different sizes to choose from. Cup Stone is relatively more affordable than other top brand’s sew on stones and can make for a great alternative.",
    detailImages: [
      "https://shine-art.com/wp-content/uploads/2015/12/146-PELLOSA-CUP-STONE.png",
      "https://shine-art.com/wp-content/uploads/2015/12/Cup-stone-Size-4x2-1024x512.jpg",
      "https://shine-art.com/wp-content/uploads/2015/12/Cup-Stone-Color-5x5-1024x1024.jpg",
    ],
  },
  {
    id: "cup-chain",
    title: "Cup Chain",
    category: "sew-on",
    categoryLabel: "Sew-On Stones & Cup Chains",
    image: "https://www.shine-art.com/wp-content/uploads/2015/12/CUP-CHAIN.jpg",
    alt: "CUP CHAIN",
    description: "Cup Chain is one of our premium grade product that only includes strictly selected items from our wide range of products. Cup Chain is made from finely polished point back Chaton Stone where they are meticulously set in metal Silver, Gold, or Gray pronged cup giving it a stunning cup chain settings where it can easily be sewn or glued onto garments. Cup Chain comes in 22 distinctive colors with sizes ranging from SS-06 to SS-30.Based on your designs or projects, Cup Chain offers 2 types of layout where one, the stones are more compact and next to each other whereas the second type will give you more spacing in between the stones. With Cup Chain, you have the option to get them in a single line, two lines, three lines, and 4 lines. The Cup Chain is relatively inexpensive and a great way to accessorize or make your design astonishing.",
    detailImages: [
      "https://shine-art.com/wp-content/uploads/2015/12/147-PELLOSA-CUP-CHAIN.png",
      "https://shine-art.com/wp-content/uploads/2015/12/Cup-Chain-Size-A-Model-1024x819.jpg",
      "https://shine-art.com/wp-content/uploads/2015/12/Cup-Chain-Size-B-Model-1024x819.jpg",
      "https://shine-art.com/wp-content/uploads/2015/12/Silver-C-01-복사본-horz-1024x205.jpg",
      "https://shine-art.com/wp-content/uploads/2015/12/Cup-Stone-Color-5x5-1024x1024.jpg",
    ],
  },
  {
    id: "hot-fix-tape",
    title: "Hot Fix Tape",
    category: "accessories",
    categoryLabel: "Application Accessories & Materials",
    image: "https://www.shine-art.com/wp-content/uploads/2016/01/HOT-FIX-TAPE2.jpg",
    alt: "HOT FIX TAPE",
    description: "Hot Fix Tape is also referred to as transfer paper. Hot Fix Tape is an indispensable subsidiary material for Rhinestone motif productions and comes in two types: Acrylic tape and Silicon tape. Acrylic Transfer Tape consists of a transparent adhesive top part and a white emboss texture finishing paper at the bottom. Acrylic Transfer Tape contents of the glue is approximately 25g per meter and is relatively lower than Silicon Transfer Tape. Acrylic Transfer Tape is characterized by its thin and light adhesive that is made suitable for the Rhinestone motif where it will hold the Rhinestones in place for small to modest designs size containing lightweight Rhinestones. Acrylic Transfer Tape is one of our top steady sellers with its economical advantage.",
    detailImages: [
      "https://shine-art.com/wp-content/uploads/2016/01/hot-fix-tape.jpg",
      "https://shine-art.com/wp-content/uploads/2016/01/Acrylic-Tape.jpg",
      "https://shine-art.com/wp-content/uploads/2016/01/Silicon-Tape.jpg",
    ],
  },
  {
    id: "embo-paper",
    title: "Embo Paper",
    category: "accessories",
    categoryLabel: "Application Accessories & Materials",
    image: "https://www.shine-art.com/wp-content/uploads/2016/01/EMBO-PAPER2.jpg",
    alt: "EMBO PAPER",
    description: "Korean Embo Paper is renowned for not only its superior quality but also its affordable price among all kinds of Embo Papers. Embo Paper is referred to as &#8220;embossing&#8221; paper which one of the essential material to make motif mold (template). Formerly, Embo Paper was regarded as wrapping paper that contains embossed patterns produced through the embossing process, and now, it is widely used in the Rhinestone motif market thanks to its superior durability and solidity. Unlike other papers that can peel off easily by the sharp edges of the Rhinestones during hand work, it maintains its own shape and is also good for long-term storage for later use without damages.",
    detailImages: [
      "https://shine-art.com/wp-content/uploads/2016/01/embo-paper.jpg",
      "https://shine-art.com/wp-content/uploads/2016/01/embo-paper1.jpg",
    ],
  },
  {
    id: "catalog",
    title: "Catalog",
    category: "accessories",
    categoryLabel: "Application Accessories & Materials",
    image: "https://www.shine-art.com/wp-content/uploads/2016/01/6-trial-e1580274041814.png",
    alt: "6 trial",
    description: "Catalog is the best media for customer who always wants to see actual samples. That&#8217;s the reason why Shine Art keeps making numerous effort to make better catalog, and, now, it became an industrial standard which is referred by customers from all over the world. Please click and check our various catalogs.",
    detailImages: [
      "https://www.shine-art.com/wp-content/uploads/2016/01/HOT-FIX-COLLECTION_PNG.png",
      "https://www.shine-art.com/wp-content/uploads/2016/01/HOT-FIX-COLLECTION_PNG-thumbnail-300x300.png",
      "https://www.shine-art.com/wp-content/uploads/2016/01/shineart-total-catalog-2015ver-inside-300x300.jpg",
    ],
  },
];

export const rhinestoneCategories: readonly RhinestoneCategoryGroup[] = [
  {
    category: "hot-fix",
    label: "Hot-Fix Rhinestones & Studs",
    description:
      "Machine-cut, Korean quality (A/AAA), convex, octagon, and metallic studs equipped with heat-activated adhesive backing for apparel decoration.",
    items: rhinestoneItems.filter((i) => i.category === "hot-fix"),
  },
  {
    category: "sew-on",
    label: "Sew-On Stones & Cup Chains",
    description:
      "Faceted chaton stones, stones with metal prong caps, and continuous brass cup chains designed for direct garment attachment and high-end trims.",
    items: rhinestoneItems.filter((i) => i.category === "sew-on"),
  },
  {
    category: "film",
    label: "Heat Transfer & Motif Films",
    description:
      "Specialty transfer films including glitter, solid polyurethane, flock, metallic, and holographic effects for heat-press motif application.",
    items: rhinestoneItems.filter((i) => i.category === "film"),
  },
  {
    category: "accessories",
    label: "Application Accessories & Materials",
    description:
      "Industrial hot-fix carrier tape, silicone embossing paper, and production materials engineered for consistent heat transfer and clean peeling.",
    items: rhinestoneItems.filter((i) => i.category === "accessories"),
  },
];

/** Helper lookup functions */
export function getRhinestoneItem(id: string): RhinestoneItem | undefined {
  return rhinestoneItems.find((item) => item.id === id);
}

export function getRhinestonesByCategory(category: RhinestoneCategory): readonly RhinestoneItem[] {
  return rhinestoneItems.filter((item) => item.category === category);
}
