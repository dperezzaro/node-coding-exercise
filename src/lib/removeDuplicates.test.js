const removeDuplicates = require('./removeDuplicates');

describe('removeDuplicates', () => {
  describe('with custom filter', () => {
    it('should remove field duplicates', () => {
      const out = removeDuplicates(
        // application
        {
          arr: [
            { id: 1 },
            { id: 1 },
          ],
        },
        // filter options
        [
          { name: 'arr', filterBy: 'id' },
        ],
      );

      expect(out).toHaveProperty('arr');
      expect(out.arr).toHaveLength(1);
      expect(out.arr[0]).toEqual({ id: 1 });
    });

    it('should remove multiple field duplicates', () => {
      const out = removeDuplicates(
        // application
        {
          arr1: [
            { id: 1 },
            { id: 1 },
          ],
          arr2: [
            { id: 2 },
            { id: 2 },
          ],
        },
        // filter options
        [
          { name: 'arr1', filterBy: 'id' },
          { name: 'arr2', filterBy: 'id' },
        ],
      );

      expect(out).toHaveProperty('arr1');
      expect(out.arr1).toHaveLength(1);
      expect(out.arr1[0]).toEqual({ id: 1 });

      expect(out).toHaveProperty('arr2');
      expect(out.arr2).toHaveLength(1);
      expect(out.arr2[0]).toEqual({ id: 2 });
    });

    it('should remove nested field duplicates', () => {
      const out = removeDuplicates(
        // application
        {
          arr: [
            {
              id: 1,
              nestedArr: [
                { id: 1 },
                { id: 1 },
              ],
            },
          ],
        },
        // filter options
        [
          {
            name: 'arr',
            filterBy: 'id',
            filterProps: [
              { name: 'nestedArr', filterBy: 'id' },
            ],
          },
        ],
      );

      expect(out).toHaveProperty('arr');
      expect(out.arr).toHaveLength(1);
      expect(out.arr[0]).toEqual({ id: 1, nestedArr: [{ id: 1 }] });
    });

    it('should remove multiple nested field duplicates', () => {
      const out = removeDuplicates(
        // application
        {
          arr: [
            {
              id: 1,
              nestedArr1: [
                { id: 1 },
                { id: 1 },
              ],
              nestedArr2: [
                { id: 2 },
                { id: 2 },
              ],
            },
          ],
        },
        // filter options
        [
          {
            name: 'arr',
            filterBy: 'id',
            filterProps: [
              { name: 'nestedArr1', filterBy: 'id' },
              { name: 'nestedArr2', filterBy: 'id' },
            ],
          },
        ],
      );

      expect(out).toHaveProperty('arr');
      expect(out.arr).toHaveLength(1);
      expect(out.arr[0]).toEqual({
        id: 1,
        nestedArr1: [{ id: 1 }],
        nestedArr2: [{ id: 2 }],
      });
    });

    it('should keep first occurrence of duplicated objects', () => {
      const out = removeDuplicates(
        // application
        {
          arr: [
            { id: 1, prop: 'first' },
            { id: 1, prop: 'second' },
          ],
        },
        // filter options
        [
          { name: 'arr', filterBy: 'id' },
        ],
      );

      expect(out).toHaveProperty('arr');
      expect(out.arr).toHaveLength(1);
      expect(out.arr[0]).toEqual({ id: 1, prop: 'first' });
    });

    it('should not remove non-duplicated objects', () => {
      const out = removeDuplicates(
        // application
        {
          arr: [
            { id: 1, prop: 'first' },
            { id: 2, prop: 'second' },
            { id: 3, prop: 'third' },
            { id: 4, prop: 'fourth' },
          ],
        },
        // filter options
        [
          { name: 'arr', filterBy: 'id' },
        ],
      );

      expect(out).toHaveProperty('arr');
      expect(out.arr).toHaveLength(4);
      expect(out.arr).toEqual([
        { id: 1, prop: 'first' },
        { id: 2, prop: 'second' },
        { id: 3, prop: 'third' },
        { id: 4, prop: 'fourth' },
      ]);
    });
  });

  describe('with default filter', () => {
    test('should remove duplicates', () => {
      const out = removeDuplicates(
        // application
        {
          versions: [
            {
              objects: [
                {
                  name: 'Object',
                  fields: [
                    { name: 'Field' },
                    { name: 'Field' },
                  ],
                },
                {
                  name: 'Object',
                },
              ],
              scenes: [
                {
                  key: 'Scene',
                  views: [
                    { key: 'Field' },
                    { key: 'Field' },
                  ],
                },
                {
                  key: 'Scene',
                },
              ],
            },
          ],
        },
      );

      expect(out).toEqual({
        versions: [
          {
            objects: [
              {
                name: 'Object',
                fields: [
                  { name: 'Field' },
                ],
              },
            ],
            scenes: [
              {
                key: 'Scene',
                views: [
                  { key: 'Field' },
                ],
              },
            ],
          },
        ],
      });
    });
  });
});
