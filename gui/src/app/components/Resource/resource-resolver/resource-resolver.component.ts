import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, input } from '@angular/core';
import { resourceMeta } from '@app/service/zz_gen_resources';
import { CompoundResourceComponent } from '../compound-resource/compound-resource.component';
import { ComponentConfig, RecordData } from '../configs';
import { ResourceStore } from '../resource-store.service';

@Component({
  selector: 'app-resource-resolver',
  imports: [CompoundResourceComponent, CommonModule],
  templateUrl: './resource-resolver.component.html',
  styleUrl: './resource-resolver.component.scss',
  providers: [ResourceStore],
})
export class ResourceResolverComponent {
  store = inject(ResourceStore);
  resourceConfig = input.required<ComponentConfig>();
  parentData = input.required<RecordData>();
  missingUuid = computed(() => {
    return this.store.listData().length === 0;
  });
  uuid = computed(() => {
    const listData = this.store.listData();
    if (listData.length === 1) {
      return String(listData[0]?.['id']);
    }
    const matchedCase = this.resolvedCase();
    if (!matchedCase) return null;
    const parentData = this.parentData();
    return String(parentData[matchedCase.case.childId]);
  });
  resolvedCase = computed(() => {
    const config = this.resourceConfig();
    const parentData = this.parentData();
    const matchedCase = config.params.cases.find((c) => parentData[c.parentField] === c.caseId);
    if (!matchedCase) return null;
    return {
      case: matchedCase,
      config: matchedCase.config,
    };
  });

  constructor() {
    effect(() => {
      const uuid = this.uuid();
      const caseConfig = this.resolvedCase();
      this.store.filter.set('id:eq:' + uuid);
      if (uuid && caseConfig) {
        this.store.resourceName.set(caseConfig.config.primaryResource);
        this.store.resourceMeta.set(resourceMeta(this.store.resourceName()));
        this.store.buildStoreListData();
      }
    });
  }
}
