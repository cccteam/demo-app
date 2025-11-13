import { Component, computed, input } from '@angular/core';
import { ActionButtonContext } from '../actions.interface';

@Component({
  selector: 'app-action-access-control-wrapper',
  styles: `
    :host {
      margin-top: auto;
      margin-bottom: auto;
    }
  `,
  template: `@if (showAction()) {
    <ng-content />
  }`,
})
export class ActionAccessControlWrapper {
  actionContext = input<ActionButtonContext>();

  showAction = computed(() => {
    const context = this.actionContext();
    let isActionPermittedForUser = true;

    if (context === undefined) {
      return true;
    }

    const actionType = context.actionType;
    if (actionType === 'rpc') {
      //TODO: When ABAC permissions is completed, update this logic
      isActionPermittedForUser = true;
    }

    if (actionType === 'create') {
      isActionPermittedForUser = !context.meta.createDisabled;
    }

    if (actionType === 'edit') {
      isActionPermittedForUser = !context.meta.updateDisabled;
    }

    if (actionType === 'delete') {
      isActionPermittedForUser = !context.meta.deleteDisabled;
    }

    if (!isActionPermittedForUser) {
      console.debug('ACCESS CONTROL | ', actionType, ' action not permitted for user in context: ', context);
      return false;
    }

    let showAction = true;
    try {
      showAction = context.shouldRender(context.resourceData);
    } catch (e) {
      console.error('Failed to calculate value for should Render function for action: ', actionType);
      console.error(e);
    }
    return showAction;
  });
}
