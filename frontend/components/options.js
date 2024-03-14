export const products = [
  [
    { id: 'de', label: 'Decal', isSelect: false, options: [{ id: 'de1', label: 'Contour Cut', ar: '1:1', grid: true }], isDisabled: false },
    {
      id: 'dp',
      label: 'Digital Print',
      isSelect: true,
      options: [
        { id: 'dp1', label: '11x14 Vertical', ar: '4:5', grid: true },
        { id: 'dp2', label: '11x14 Horizontal', ar: '5:4', grid: true },
        { id: 'dp3', label: '16x20 Vertical', ar: '4:5', grid: true },
        { id: 'dp4', label: '16x20 Horizontal', ar: '5:4', grid: true },
        { id: 'dp5', label: '18x24 Vertical', ar: '3:4', grid: true },
        { id: 'dp6', label: '18x24 Horizontal', ar: '4:3', grid: true },
        { id: 'dp7', label: '24x36 Vertical', ar: '2:3', grid: true },
        { id: 'dp8', label: '24x36 Horizontal', ar: '3:2', grid: true },
      ],
      isDisabled: false,
    },
    {
      id: 'ba',
      label: 'Banner',
      isSelect: true,
      options: [
        { id: 'ba1', label: `2'x4"`, ar: '2:1', grid: true },
        { id: 'ba2', label: `2'x5"`, ar: '5:2', grid: false },
        { id: 'ba3', label: `2'x6"`, ar: '3:1', grid: false },
        { id: 'ba4', label: `2'x8"`, ar: '4:1', grid: false },
        { id: 'ba5', label: `3'x4"`, ar: '4:3', grid: true },
        { id: 'ba6', label: `3'x5"`, ar: '5:3', grid: true },
        { id: 'ba7', label: `3'x6"`, ar: '2:1', grid: true },
        { id: 'ba8', label: `3'x8" (Most Common)`, ar: '8:3', grid: false },
        { id: 'ba9', label: `3'x10"`, ar: '10:3', grid: false },
        { id: 'ba10', label: `3'x12"`, ar: '4:1', grid: false },
        { id: 'ba11', label: `4'x4"`, ar: '1:1', grid: true },
        { id: 'ba12', label: `4'x5"`, ar: '5:4', grid: true },
        { id: 'ba13', label: `4'x6"`, ar: '3:2', grid: true },
        { id: 'ba14', label: `4'x8"`, ar: '2:1', grid: true },
        { id: 'ba15', label: `4'x10"`, ar: '5:2', grid: false },
        { id: 'ba16', label: `4'x12"`, ar: '3:1', grid: false },
      ],
      isDisabled: false,
    },
  ],
  [
   
    {
      id: 'wi',
      label: 'Truck Back Window Graphics',
      isSelect: false,
      options: [{ id: 'wi1', label: 'Choose size at checkout', ar: '32:9', grid: false }],
      isDisabled: false,
    },
    { id: 'ts', label: 'T-Shirt', isSelect: false, options: [{ id: 'ts1', label: 'Coming Soon' }], isDisabled: true },
    { id: '3d', label: '3D Printed Model', isSelect: false, options: [{ id: '3d1', label: 'Coming Soon' }], isDisabled: true },
  ],
]
