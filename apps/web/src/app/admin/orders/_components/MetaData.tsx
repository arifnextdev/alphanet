// import { Button } from '@/components/ui/button';
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog';
// import { LockIcon } from 'lucide-react';

// interface Metadata {
//   [key: string]: any;
// }

// const MetaData = ({ metadata }: { metadata: Metadata }) => {
//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button variant="outline" size="icon">
//           <LockIcon className="w-4 h-4" />
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-lg">
//         <DialogHeader>
//           <DialogTitle>Credentials</DialogTitle>
//         </DialogHeader>
//         <div className="space-y-4">
//           {Object.keys(metadata).map((key) => (
//             <div key={key} className="space-y-2">
//               <label className="block text-lg font-medium ">{key}</label>
//               <input
//                 type="text"
//                 value={metadata[key]}
//                 readOnly
//                 disabled
//                 className="block w-full px-5 py-2.5 text-sm  border  rounded-md "
//               />
//             </div>
//           ))}
//         </div>
//         <DialogClose asChild>
//           <Button variant="outline">Close</Button>
//         </DialogClose>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default MetaData;
