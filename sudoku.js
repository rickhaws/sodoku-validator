var Sudoku = function(data) 
{
  //   Private methods
  // -------------------------
  function print(x) {
    return JSON.stringify(x, function(k,v){
     if(v instanceof Array && !(v[0] instanceof Array))
        return JSON.stringify(v);
     return v;
    },2);
  }
  
  function isValidSet(set) {
//     /* */console.log('set', print(set));
    if (!set.every(x =>
      typeof x === "number" &&
      x >= 1 && 
      x <= set.length
    )) { 
//       /* */ set.forEach(x => console.log(typeof x === "number", x >= 1, x <= set.length))
      return false; 
    }
    
    const counts = Array(set.length).fill(0);
    set.forEach(value => counts[value-1]++);
//     /* */console.log('counts', print(counts))
    return counts.every(c => c===1);
  }


  //   Public methods
  // -------------------------
  return {
    isValid: function() {
//       /* */console.log('data', print(data));
      const n = data[0].length;
//       /* */ console.log('n', n)
      let valid = (data.length === n) && (data.every(row => row.length === n));
//       /* */console.log('structure valid', valid);
      if(!valid) {
//         /* */ console.log('invalid lengths')//, data.map(row => row.length));
      }
      
      if(valid) {
        valid = data.every(row => isValidSet(row));
      }

      if(valid) {
        const indices = [...data.keys()];
        const columns = indices.map(i => indices.map(j => data[j][i]));
        valid = columns.every(col => isValidSet(col));
//         /* */console.log("columns", print(columns))
       }
      
      if(valid) {
        const nb = Math.sqrt(n);
        subIndices = [...Array(nb).keys()];
//         /* */ console.log('subIndices', print(subIndices))
        const innerBlocks = 
          subIndices.flatMap(ib => 
            subIndices.map(jb => 
              subIndices.flatMap(i => 
                subIndices.map(j => data[ib*nb + i][jb*nb + j]))));
                         
//          /* */console.log('inner blocks', print(innerBlocks))
        valid = innerBlocks.every(block => isValidSet(block));
      } 
      
      return valid;
    }
  };
};
